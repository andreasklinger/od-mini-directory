import { Resolver, Query, Arg } from "type-graphql";
import { User } from "../entities/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  Users() {
    return User.find();
  }

  @Query(() => User)
  User(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }
}

