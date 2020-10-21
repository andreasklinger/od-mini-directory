import { connectDatabase } from './index';

const users = [
  {
    id: 1,
    name: 'Testov Testovic',
    shortBio: 'I was born.',
    isVerified: false,
  },
  { id: 2, name: 'Abe Betov', shortBio: 'I also born.', isVerified: false },
  { id: 3, name: 'Cesar Julio', shortBio: 'I later born.', isVerified: true },
];
const seed = async () => {
  try {
    console.log('[seed] : running...');

    const db = await connectDatabase();

    db.usersRepo.clear();
    const newUser = db.usersRepo.create(users[0]);
    await db.usersRepo.save(newUser);
    await users.forEach((user) => {
      const newUser = db.usersRepo.create(user);
      db.usersRepo.save(newUser);
    });

    console.log('[seed] : success');
  } catch {
    throw new Error('failed to seed database');
  }
};

seed();
