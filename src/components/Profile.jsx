import React from 'react';
import { Header } from 'semantic-ui-react'
import { Loading } from './Loading';
import { RandomImage } from './RandomImage';

export function Profile({ userState = null }) {
  const { data: user = null, loading = null, error = null } = userState ?? {};
  if (loading) return <Loading />
  if (!user) return <p>no user info</p>;
  return (
    <div className='fb-profile'>
      <Header as='h3'>
        <RandomImage keywords='silhouette' w='96' h='96' circular wrapped={false} ui={true} label={null} /> Hi, {user.username}
      </Header>
      <div className='fb-profile-row'><label>email: </label><span>{user.email}</span></div>
      <div className='fb-profile-row'><label>phone: </label><span>{user.phone}</span></div>
      <div className='fb-profile-row'><label>first_name: </label><span>{user.first_name}</span></div>
      <div className='fb-profile-row'><label>last_name: </label><span>{user.last_name}</span></div>
      <div className='fb-profile-row'><label>id: </label><span>{user.id}</span></div>
    </div>
  );
}
