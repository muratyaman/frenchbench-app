import React from 'react';
import { useRouter } from 'next/router';

function UserPostPage(props) {
  const router = useRouter();
  const { username = null, post_ref = null } = router.query;
  return (
    <div>
      <p>user post</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default UserPostPage;
