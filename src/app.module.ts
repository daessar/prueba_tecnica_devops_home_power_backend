import { Module, Controller, Get, Redirect } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';

@Controller()
export class AppController {
  @Get()
  @Redirect('/clients', 301)
  redirectToClients() {
    return;
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}

@Module({
  imports: [ClientsModule],
  controllers: [AppController],
})
export class AppModule {}
