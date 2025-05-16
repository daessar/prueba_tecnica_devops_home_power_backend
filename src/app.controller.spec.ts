import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.module';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('redirectToClients', () => {
    it('should return undefined (for redirect)', () => {
      const result = controller.redirectToClients();
      expect(result).toBeUndefined();
    });
  });

  describe('healthCheck', () => {
    it('should return a status object', () => {
      const result = controller.healthCheck();
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('timestamp');
      expect(result.status).toBe('ok');
    });
  });
}); 