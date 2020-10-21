import faker from 'faker';
import { User } from '../entities/User';

const generateRandomUser = (): User => {
  const id = faker.random.uuid();
  const name = faker.name.findName();
  const shortBio = faker.lorem.sentence();
  const isVerified = faker.random.boolean();

  return { id, name, shortBio, isVerified };
};

export const generateRandomUsers = (total: number = 100): User[] => {
  const users = Array.from(Array(total).keys()).map((n) =>
    generateRandomUser(),
  );

  return users;
};
