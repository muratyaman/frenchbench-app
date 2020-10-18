import React from 'react';
import { FbCallToAccount, FbCardCommunity, PublicLayout } from '../components';
import { apiClient } from '../lib/apiClient';
import { useCurrentUser } from '../lib/useCurrentUser';

// public home page
function PublicIndex(props) {
  const api = apiClient();
  const userState = useCurrentUser(api);
  return (
    <PublicLayout title='Home page' userState={userState}>
      <h1>Welcome</h1>
      <FbCardCommunity />
      <FbCallToAccount />
    </PublicLayout>
  );
}

export default PublicIndex;
