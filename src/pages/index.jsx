import React from 'react';
import { FbCallToAccount, FbCardCommunity, PublicLayout } from '../components';
import { apiClient } from '../lib/apiClient';
import { useCurrentUser } from '../lib/useCurrentUser';

// public home page
function PublicIndex(props) {
  const api = apiClient();
  const { data: user = null, loading, error } = useCurrentUser(api);
  return (
    <PublicLayout title='Home page' user={user}>
      <h1>Welcome</h1>
      <FbCardCommunity />
      <FbCallToAccount />
    </PublicLayout>
  );
}

export default PublicIndex;
