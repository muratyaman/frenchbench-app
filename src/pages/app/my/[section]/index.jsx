import React from 'react';
import { useRouter } from 'next/router';
import { FbMyProfile, FbProtectedMyMenu, Loading, ProtectedLayout } from '../../../../components';
import { apiClient } from '../../../../lib/apiClient';
import { useMounted } from '../../../../lib/useMounted';
import { useCurrentUser } from '../../../../lib/useCurrentUser';

function ProtectedMySection(props) {
  const router = useRouter();
  const { section = 'home', tag = '' } = router.query;
  const api = apiClient();
  const isMounted = useMounted();
  const currentUserState = useCurrentUser(api);
  const myMenuProps = { section, api, currentUserState };
  return (
    <ProtectedLayout title='Home page' currentUserState={currentUserState}>
      {!isMounted ? <Loading /> : (
        <>
          <FbMyProfile currentUserState={currentUserState} />
          <FbProtectedMyMenu {...myMenuProps} />
        </>
      )}
    </ProtectedLayout>
  );
}

export default ProtectedMySection;
