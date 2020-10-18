import React from 'react';
import { Header } from 'semantic-ui-react'
import { Loading } from './Loading';
import { RandomImage } from './RandomImage';

export function Profile({ userState = null }) {
  const { data: user = null, loading = null, error = null } = userState ?? {};
  if (loading) return <Loading />
  if (!user) return <p>no user info</p>;
  return (
    <p>
      <Header as='h3'>
        <RandomImage keywords='silhouette' w='96' h='96' circular wrapped={false} ui={true} label={null} /> Hi, {user.username}
      </Header>
      <label>email: </label><span>{user.email}</span><br />
      <label>phone: </label><span>{user.phone}</span><br />
      <label>first_name: </label><span>{user.first_name}</span><br />
      <label>last_name: </label><span>{user.last_name}</span><br />
      <label>id: </label><span>{user.id}</span><br />
    </p>
  );
}
