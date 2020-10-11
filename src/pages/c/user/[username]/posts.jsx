import React from 'react';

function UserPostsPage(props) {
  return (
    <div>
      <p>user posts</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default UserPostsPage;
