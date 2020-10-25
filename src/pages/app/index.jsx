import React from 'react';
import { useRouter } from 'next/router';
import { useMounted } from '../../lib/useMounted';
import { Loading } from '../../components';

function ProtectedIndex(props) {
  const router = useRouter();
  const isMounted = useMounted();
  if (isMounted) {
    router.push('/app/my/home');
    return <div>redirecting...</div>
  }
  return <Loading />;
}

export default ProtectedIndex;
