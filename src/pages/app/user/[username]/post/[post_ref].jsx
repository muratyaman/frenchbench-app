import React from 'react';

function UserPostPage(props) {
  return (
    <div>
      <p>user post</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default UserPostPage;
