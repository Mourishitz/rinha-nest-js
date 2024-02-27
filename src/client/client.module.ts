import { Module } from '@nestjs/common';
import { ClientService } from '@client/services/client.service';
import { ClientController } from '@client/controllers/client.controller';
import { ClientRepository } from '@client/repositories/client.repository';
import { DATABASE_CONNECTION } from '@database/database.interface';
import { KnexDatabaseService } from '@database/knex.service';

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
