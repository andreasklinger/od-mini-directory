import { createConnection } from 'typeorm';

export const connectDatabase = async (): Promise<any> => {
  try {
    const connection = await createConnection();
    return connection;
  } catch (e) {
    throw new Error('failed to connect with database');
  }
};
