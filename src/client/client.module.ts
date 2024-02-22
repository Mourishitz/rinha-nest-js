import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { ClientRepository } from './client.repository';
import { DATABASE_CONNECTION } from 'src/database/database.interface';
import { KnexDatabaseService } from 'src/database/knex.service';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useClass: KnexDatabaseService,
    },
    ClientService,
    ClientRepository,
  ],
})
export class ClientModule {}
