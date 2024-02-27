import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import { DatabaseConnection } from '@database/database.interface';

@Injectable()
export class KnexDatabaseService implements DatabaseConnection {
  private knexConfig: Knex;

  constructor() {
    this.knexConfig = knex({
      client: 'pg',
      connection: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
      },
      pool: {
        min: 2,
        max: 5,
      },
    });
  }

  async createConnection(): Promise<Knex> {
    return this.knexConfig;
  }

  async createTransaction(): Promise<Knex> {
    return this.knexConfig.transaction();
  }

  async destroy() {
    await this.knexConfig.destroy();
  }
}
