import React from 'react';
import { useRouter } from 'next/router';
import { FbProtectedMenu, Loading, Profile, ProtectedLayout } from '../../../components';
import { apiClient } from '../../../lib/apiClient';
import { useMounted } from '../../../lib/useMounted';
import { useCurrentUser } from '../../../lib/useCurrentUser';

function ProtectedSection(props) {
  const router = useRouter();
  const { section = 'home' } = router.query;
  console.log('ProtectedSection props', props, 'router.query', router.query);
  const api = apiClient();
  const isMounted = useMounted();
  const userState = useCurrentUser(api);
  return (
    <ProtectedLayout title='Home page' userState={userState}>
      {!isMounted ? <Loading /> : (
        <>
          <Profile userState={userState} />
          <FbProtectedMenu section={section} api={api} />
        </>
      )}
    </ProtectedLayout>
  );
}

export default ProtectedSection;
