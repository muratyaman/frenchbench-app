import React from 'react';
import { useRouter } from 'next/router';

function UserProfilePage(props) {
  const router = useRouter();
  const { username = null } = router.query;
  return (
    <div>
      <p>user profile</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export default UserProfilePage;
