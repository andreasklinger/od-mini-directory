import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { UserItem } from './UserItem';
import { User } from '../models/User';

interface UserData {
  Users: User[];
}

interface UserVars {
  name: string;
}

const GET_ROCKET_INVENTORY = gql`
  query GetUsers {
    Users {
      id
      name
      shortBio
      isVerified
      avatar
    }
  }
`;

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {},
  );
  return (
    <div className='text-center container'>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>ShortBio</th>
            </tr>
          </thead>
          <tbody>
            {data && data.Users.map((user) => <UserItem user={user} />)}
          </tbody>
        </table>
      )}
    </div>
  );
}
