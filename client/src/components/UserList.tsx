import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

interface User {
  id: number;
  name: string;
  shortBio: string;
  isAdmin: boolean;
}

interface UserData {
  Users: User[];
  prevState: [];
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
      isAdmin
    }
  }
`;

const CHECKBOXES = {
  ALL: "ALL",
  ADMIN: "ADMIN",
  NON_ADMIN: "NON_ADMIN"
}

const LIMIT = 1;

export function UserList() {
  const { loading, data } = useQuery<UserData, UserVars>(
    GET_ROCKET_INVENTORY,
    {}
  );

  const [term, setTerm] = useState("");

  const [users, setUsers] = useState<UserData["Users"] | []>([]);

  const [checked, setChecked] = useState(CHECKBOXES.ALL);

  const [pointer, setPointer] = useState(LIMIT);

  const handleSearch = (e: any) => {
    const { value } = e.target;

    const filteredUsers = data?.Users.filter((user) => {
      return user.name.toLowerCase().includes(value) || user.shortBio.toLowerCase().includes(value);
    }) || [];

    if (data && value === "") {
      // reset search results
      setUsers(data.Users);
    } else {
      setUsers(filteredUsers);
    }

    setTerm(value)
  }

  useEffect(() => {
    data && setUsers(data.Users)
  }, [data]);

  const allIsChecked = () => checked === CHECKBOXES.ALL;

  const adminIsChecked = () => checked === CHECKBOXES.ADMIN;

  const nonAdminIsChecked = () => checked === CHECKBOXES.NON_ADMIN;

  const handleInputChange = (newChecked: string) => setChecked(newChecked);

  const isChecked = (user: User) => {
    switch (checked) {
      case CHECKBOXES.ADMIN:
        return user.isAdmin;
      case CHECKBOXES.NON_ADMIN:
          return !user.isAdmin;
      default:
        return true;
    }
  }

  const handleLoadMoreClick = () => {
    setPointer(pointer + LIMIT);
  }

  const noMoreResults = () => users.length && users.filter(isChecked).length + 1 <= pointer;

  const noUsersMatchCriteria = () => {
    const usersWithAdminFilter = users.filter(isChecked);
    return usersWithAdminFilter.length === 0;
  }

  const renderPagination = () => {
    if (noMoreResults()) {
      return "No more results 🙃";
    }

    if (noUsersMatchCriteria()) {
      return "No users match this criteria 😕 Try again!";
    }

    return (
      <button onClick={handleLoadMoreClick}>Load More...</button>
    )
  }

  return (
    <div>
      <h3>Users</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
          <React.Fragment>
            <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ShortBio</th>
              </tr>
            </thead>
            <tbody>
              {data && (users as UserData["Users"]).filter(isChecked).slice(0, pointer).map((user: User) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.shortBio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {renderPagination()}
          </div>
          <div style={{margin: "16px 0"}}>
            <label>Search</label>
            <input type="text" value={term} onChange={handleSearch} />
          </div>
          <div>
            <label>
              <input type="radio" checked={allIsChecked()} onChange={() => handleInputChange(CHECKBOXES.ALL)}/>All
            </label>
            <label>
              <input type="radio" checked={adminIsChecked()} onChange={() => handleInputChange(CHECKBOXES.ADMIN)} />Admin
            </label>
            <label>
              <input type="radio" checked={nonAdminIsChecked()} onChange={() => handleInputChange(CHECKBOXES.NON_ADMIN)}/>Non-admin
            </label>
          </div>
          </React.Fragment>
        )}
    </div>
  );
}
