import React from 'react';
import { Loading } from './Loading';
import { useUser } from '../utils/clientSide';

export function Profile({ id = null }) {
  const { user, isLoading, isError } = useUser(id)

  if (isLoading) return <Loading />
  if (isError) return <p>error fetching user data</p>

  return (
    <p>
      <span>Welcome back, {user.username}</span><br />
      <label>email: </label><span>{user.email}</span><br />
      <label>phone: </label><span>{user.phone}</span><br />
      <label>first_name: </label><span>{user.first_name}</span><br />
      <label>last_name: </label><span>{user.last_name}</span><br />
      <label>id: </label><span>{user.id}</span><br />
    </p>
  );
}
