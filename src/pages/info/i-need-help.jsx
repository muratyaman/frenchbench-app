import React from 'react';
import { FbCallToAccount, FbCardHelpNeeded, PublicLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

function ICanHelp(props) {
  const api = apiClient();
  const userState = useCurrentUser(api);
  return (
    <PublicLayout title="I Need Help" userState={userState}>
      <FbCardHelpNeeded />
      {!userState.data && <FbCallToAccount />}
    </PublicLayout>
  );
}

export default ICanHelp;
