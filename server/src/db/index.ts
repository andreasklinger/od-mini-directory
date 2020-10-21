import { createConnection } from 'typeorm';
import { User } from '../entities/User';

export const connectDatabase = async (): Promise<any> => {
  try {
    const connection = await createConnection();
    return connection;
  } catch {
    throw new Error('failed to connect with database');
  }
};
