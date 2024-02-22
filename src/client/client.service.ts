import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) { }

  async createTransactionFromClient(
    id: number,
    transaction: Transaction.Create,
  ) {
    return await this.clientRepository.createTransactionForClient(
      id,
      transaction,
    );
  }
}
