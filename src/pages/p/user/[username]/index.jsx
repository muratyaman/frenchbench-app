import React from 'react';

function UserProfilePage(props) {
  return (
    <div>
      <p>user profile</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default UserProfilePage;
