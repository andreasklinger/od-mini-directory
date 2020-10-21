import { getRepository } from 'typeorm';
import { connectDatabase } from '.';
import { User } from '../entities/User';
import { generateRandomUsers } from '../utils/faker';

const randomUsers = generateRandomUsers();

const seed = async () => {
  try {
    console.log('[seed] : running...');
    await connectDatabase();
    const userRepo = await getRepository(User);
    await userRepo.clear();
    const users = randomUsers.map((user) => userRepo.create(user));
    await userRepo.save(users);
    console.log('[seed] : success');
  } catch (e) {
    throw new Error('failed to seed database');
  }
};

seed();
