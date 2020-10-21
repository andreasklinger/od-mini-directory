import faker from 'faker';
import { User } from '../entities/User';

const generateRandomUser = (): Partial<User> => {
  const id = faker.random.uuid();
  const name = faker.name.findName();
  const shortBio = faker.lorem.sentence();
  const isVerified = faker.random.boolean();
  const avatar = faker.image.avatar();

  return { id, name, shortBio, isVerified, avatar };
};

export const generateRandomUsers = (total: number = 100): Partial<User>[] => {
  const users = Array.from(Array(total).keys()).map((n) =>
    generateRandomUser(),
  );

  return users;
};
