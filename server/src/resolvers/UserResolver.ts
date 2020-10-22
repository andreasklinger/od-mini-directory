import { Resolver, Query, Arg } from 'type-graphql';
import { Like } from 'typeorm';
import { User } from '../entities/User';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  Users(
    @Arg('skip', { defaultValue: 0 }) skip: number,
    @Arg('take', { defaultValue: 20 }) take: number,
    @Arg('searchTerm', { defaultValue: '' }) searchTerm?: string,
  ) {
    return User.find({
      where: [
        { name: Like(`%${searchTerm}%`) },
        { shortBio: Like(`%${searchTerm}%`) },
      ],
      skip,
      take,
    });
  }

  @Query(() => User)
  User(@Arg('id') id: string) {
    return User.findOne({ where: { id } });
  }
}
