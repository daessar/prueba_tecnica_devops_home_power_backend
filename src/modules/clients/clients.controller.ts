import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ClientsService, Client } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Client[] {
    console.log('GET /clients endpoint hit');
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Client {
    console.log(`GET /clients/${id} endpoint hit`);
    const client = this.clientsService.findOne(+id);
    if (!client) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }
    return client;
  }
}
