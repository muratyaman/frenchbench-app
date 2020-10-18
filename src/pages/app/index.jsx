import React from 'react';
import { useRouter } from 'next/router';

function ProtectedIndex(props) {
  const router = useRouter();
  router.push('/app/my/home');
  console.log('ProtectedIndex redirecting...');
  return (
    <div>redirecting...</div>
  );
}

export default ProtectedIndex;
