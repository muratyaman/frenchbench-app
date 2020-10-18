import React from 'react';
import { useRouter } from 'next/router';

function UserPostsPage(props) {
  const router = useRouter();
  const { username = null } = router.query;
  return (
    <div>
      <p>user posts</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default UserPostsPage;
