import React from 'react';
import { FbCallToAccount, FbCardHelpProvided, PublicLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

function INeedHelp(props) {
  const api = apiClient();
  const userState = useCurrentUser(api);
  return (
    <PublicLayout title="I Can Help" userState={userState}>
      <FbCardHelpProvided />
      {!userState.data && <FbCallToAccount />}
    </PublicLayout>
  );
}

export default INeedHelp;
