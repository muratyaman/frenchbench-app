import React from 'react';
import { useRouter } from 'next/router';
import { FbProtectedUserMenu, Loading, ProtectedLayout } from '../../../../components';
import { apiClient } from '../../../../lib/apiClient';
import { useMounted } from '../../../../lib/useMounted';
import { useCurrentUser } from '../../../../lib/useCurrentUser';
import { useUser } from '../../../../lib/useUser';

function UserHomePage(props) {
  const router = useRouter();
  const { username } = router.query;
  const section = 'home';
  console.log('UserHomePage props', props, 'router.query', router.query);
  const api = apiClient();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });
  const userMenuProps = {
    username,
    section,
    api,
    userState,
    currentUserState,
  }
  return (
    <ProtectedLayout title='Home page' currentUserState={currentUserState}>
      {!isMounted ? <Loading /> : <FbProtectedUserMenu {...userMenuProps} />}
    </ProtectedLayout>
  );
}

export default UserHomePage;
