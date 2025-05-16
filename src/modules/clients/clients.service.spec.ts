import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of clients', () => {
      const result = service.findAll();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('name');
      expect(result[0]).toHaveProperty('email');
      expect(result[0]).toHaveProperty('phone');
    });
  });

  describe('findOne', () => {
    it('should return a single client when it exists', () => {
      const result = service.findOne(1);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.name).toBe('Juan Pérez');
    });

    it('should return undefined when client does not exist', () => {
      const result = service.findOne(999);
      expect(result).toBeUndefined();
    });
  });
}); 