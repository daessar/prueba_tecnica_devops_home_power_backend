import { APIGatewayProxyHandler, APIGatewayEvent, Context } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverlessExpress from 'aws-serverless-express';

let cachedServer: any;

async function bootstrapServer() {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    
    const app = await NestFactory.create(AppModule, adapter);
    app.enableCors();
    await app.init();
    
    // Importante: API Gateway espera que la ruta incluya el stage como parte de la URL
    // pero Nest.js no tiene conocimiento de esto. Este middleware ajusta la URL
    // para eliminar la parte del "stage" (/Prod) si está presente.
    expressApp.use((req, res, next) => {
      const paths = req.url.split('/');
      if (paths[1] === 'Prod') {
        req.url = req.url.replace('/Prod', '');
      }
      next();
    });
    
    console.log('NestJS app initialized');
    
    cachedServer = serverlessExpress.createServer(expressApp);
  }
  return cachedServer;
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  context: Context,
) => {
  // Imprime el evento para depuración
  console.log('Lambda invoked with event:', JSON.stringify(event));
  console.log('Path:', event.path);
  console.log('Resource:', event.resource);
  
  const server = await bootstrapServer();
  return serverlessExpress.proxy(server, event, context, 'PROMISE').promise;
}; 