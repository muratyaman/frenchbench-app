import React from 'react';

function ProfilePage(props) {
  return (
    <div>
      <p>recent posts</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default ProfilePage;
