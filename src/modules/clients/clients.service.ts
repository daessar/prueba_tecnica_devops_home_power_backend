import { Injectable } from '@nestjs/common';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable()
export class ClientsService {
  private readonly clients: Client[] = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+57 312 456 7890',
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria.lopez@example.com',
      phone: '+57 313 789 4561',
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@example.com',
      phone: '+57 314 123 7890',
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@example.com',
      phone: '+57 315 456 1234',
    },
    {
      id: 5,
      name: 'Pedro González',
      email: 'pedro.gonzalez@example.com',
      phone: '+57 316 789 5678',
    },
  ];

  findAll(): Client[] {
    return this.clients;
  }

  findOne(id: number): Client | undefined {
    return this.clients.find(client => client.id === id);
  }
}
