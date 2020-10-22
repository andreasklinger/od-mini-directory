import React from 'react';
import { User } from '../../models/User';

interface IProps {
  user: User;
}

const UserItem: React.FC<IProps> = ({ user }) => {
  const { avatar, name, shortBio } = user;
  return (
    <>
      <td>
        <img src={avatar} alt={name} className='avatar' />
      </td>
      <td className='text-center'>{name}</td>
      <td className='text-left'>{shortBio}</td>
    </>
  );
};
export default UserItem;
