import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_CONNECTION,
  DatabaseConnection,
} from '@database/database.interface';

@Injectable()
export class ClientRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseService: DatabaseConnection,
  ) {}

  public async createTransactionForClient(
    id: number,
    transaction: Transaction.Create,
  ): Promise<Transaction.Response> {
    const transactionTranslator = {
      c: 'limite',
      d: 'saldo',
    };

    const clientConnection = await this.databaseService.createTransaction();

    try {
      const [client] = await clientConnection
        .table('clientes')
        .returning(['limite', 'saldo'])
        .where('id', '=', id)
        .decrement(
          `${transactionTranslator[transaction.tipo]}`,
          transaction.valor,
        );

      if (!client) {
        throw new HttpException(
          'Cliente nao encontrado.',
          HttpStatus.NOT_FOUND,
        );
      }

      clientConnection.commit();

      const newTransaction = await this.databaseService.createConnection();
      await newTransaction.table('transacoes').insert({
        cliente_id: id,
        valor: transaction.valor,
        tipo: transaction.tipo,
        descricao: transaction.descricao,
      });

      return client;
    } catch (error) {
      const errorCodes = {
        '23514': new HttpException(
          'Saldo Irregular',
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      };

      if (error instanceof HttpException) {
        throw error;
      }

      throw errorCodes[error.code];
    }
  }

  async getTransactionsFromClient(id: number): Promise<Transaction.Object[]> {
    const connection = await this.databaseService.createConnection();
    return await connection
      .table('transacoes')
      .select(['valor', 'tipo', 'descricao', 'realizada_em'])
      .where('cliente_id', '=', id);
  }

  async getBalanceFromClient(id: number): Promise<Invoice.BalanceResponse> {
    const connection = await this.databaseService.createConnection();
    const [results] = await connection
      .select(['saldo', 'limite'])
      .table('clientes')
      .where('id', '=', id);

    return {
      total: results['saldo'],
      data_extrato: new Date().toISOString(),
      limite: results['limite'],
    };
  }
}
