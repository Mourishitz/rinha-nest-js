export const DATABASE_CONNECION = 'DATABASE_CONNECION';

export interface DatabaseConnection {
  createConnection(): Promise<any>;
  createTransaction(): Promise<any>;
  destroy(): Promise<void>;
}
