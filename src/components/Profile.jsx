import React from 'react';

export function Profile({ user = null }) {
  if (!user) return <p>no user info</p>;
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
