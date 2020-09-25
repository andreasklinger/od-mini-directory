import { createConnection } from "typeorm";
import { User } from "../entities/User";

export const connectDatabase = async (): Promise<any> => {
  const connection = await createConnection();

  return {
    users: connection.getRepository(User),
  };
};
