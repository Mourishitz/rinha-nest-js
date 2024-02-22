import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Response,
} from '@nestjs/common';
import { response } from 'express';
import knex from 'knex';
import {
  DATABASE_CONNECTION,
  DatabaseConnection,
} from 'src/database/database.interface';

@Injectable()
export class ClientRepository {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseService: DatabaseConnection,
  ) {}

  public async createTransactionForClient(
    id: number,
    transaction: Transaction.Create,
  ) {
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
      console.log(error);
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

    // const newTransaction = connection
    // .table('transacoes')
    // .insert({
    //   cliente_id: id,
    //   valor: transaction.valor,
    //   tipo: transaction.tipo,
    //   descricao: transaction.descricao,
    // })
    //   .table('clientes')
    //   .decrement(
    // `${transactionTranslator[transaction.tipo]}`,
    // transaction.valor,
    //   )
    //   .where('id', '=', id)
    //   .returning(['limite', 'saldo']);
    //
    // return await newTransaction;
  }

  public async selectClient(id: number) {
    const connection = await this.databaseService.createConnection();
    return connection('clientes').where('id', id);
  }

  // public async transactions() {
  //   return this.query.leftJoin('transacoes', function() {
  //     this.on('cliente_id', '=', 'clientes.id');
  //   });
  // }
}
