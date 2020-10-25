import React from 'react';
import { useRouter } from 'next/router';
import { FbProtectedUserMenu, Loading, ProtectedLayout } from '../../../../../components';
import { apiClient } from '../../../../../lib/apiClient';
import { useMounted } from '../../../../../lib/useMounted';
import { useCurrentUser } from '../../../../../lib/useCurrentUser';
import { useUser } from '../../../../../lib/useUser';

function UserPostPage(props) {
  const router = useRouter();
  const { username, post_ref } = router.query;
  const section = 'posts';
  const api = apiClient();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const userState = useUser(api, { username });
  const userMenuProps = {
    username,
    post_ref,
    section,
    api,
    currentUserState,
    userState,
  }
  return (
    <ProtectedLayout title='Home page' currentUserState={currentUserState}>
      {!isMounted ? <Loading /> : <FbProtectedUserMenu {...userMenuProps} />}
    </ProtectedLayout>
  );
}

export default UserPostPage;
