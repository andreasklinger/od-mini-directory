import { connectDatabase } from "./index";

const users = [
  { id: 1, name: "Testov Testovic", shortBio: "I was born.", isVerified: false },
  { id: 2, name: "Abe Betov", shortBio: "I also born.", isVerified: false },
  { id: 3, name: "Cesar Julio", shortBio: "I later born.", isVerified: true },

]
const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    db.users.clear();

    await users.forEach(user => {
      db.users.create(user).save();
    });

    console.log("[seed] : success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();
