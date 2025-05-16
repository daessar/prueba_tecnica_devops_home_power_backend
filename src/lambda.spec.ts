import { handler } from './lambda';
import * as serverlessExpress from 'aws-serverless-express';

jest.mock('aws-serverless-express', () => ({
  createServer: jest.fn().mockReturnValue('mockServer'),
  proxy: jest.fn().mockReturnValue({
    promise: Promise.resolve({
      statusCode: 200,
      body: JSON.stringify([{ id: 1, name: 'Test Client' }]),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  }),
}));

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockImplementation(() => ({
      enableCors: jest.fn(),
      init: jest.fn().mockResolvedValue(undefined),
    })),
  },
}));

describe('Lambda Handler', () => {
  const mockEvent = {
    path: '/clients',
    httpMethod: 'GET',
    headers: {},
    multiValueHeaders: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {} as any,
    resource: '',
    isBase64Encoded: false,
    body: null,
  };

  const mockContext = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'test',
    functionVersion: '1',
    invokedFunctionArn: 'arn',
    memoryLimitInMB: '128',
    awsRequestId: '123',
    logGroupName: 'group',
    logStreamName: 'stream',
    getRemainingTimeInMillis: () => 1000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };

  it('should initialize server on first call', async () => {
    const response = await handler(mockEvent, mockContext, () => {});
    
    expect(response).toBeDefined();
    expect(serverlessExpress.proxy).toHaveBeenCalledWith(
      expect.anything(),
      mockEvent,
      mockContext,
      'PROMISE'
    );
  });
}); 