import { Injectable } from '@nestjs/common';
import { ClientRepository } from '@client/repositories/client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async createTransactionFromClient(
    id: number,
    transaction: Transaction.Create,
  ): Promise<Transaction.Response> {
    return await this.clientRepository.createTransactionForClient(
      id,
      transaction,
    );
  }

  async getClientInvoices(id: number): Promise<Invoice.Response> {
    const transactions: Promise<Transaction.Object[]> =
      this.clientRepository.getTransactionsFromClient(id);

    const balance: Promise<Invoice.BalanceResponse> =
      this.clientRepository.getBalanceFromClient(id);

    return {
      saldo: await balance,
      ultimas_transacoes: await transactions,
    };
  }
}
