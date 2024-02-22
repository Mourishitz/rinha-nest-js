export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export interface DatabaseConnection {
  createConnection(): Promise<any>;
  createTransaction(): Promise<any>;
  destroy(): Promise<void>;
}
