import React from 'react';
import { FbCallToAccount, FbCardCommunity, PublicLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

function ServerSidePage(props) {
  const api = apiClient();
  const { data: user = null, loading, error } = useCurrentUser(api);
  return (
    <PublicLayout title='Home page' user={user}>
      <h1>Welcome</h1>
      <FbCardCommunity />
      <FbCallToAccount />
    </PublicLayout>
  )
}

export async function getServerSideProps() {
  const slug = 'home';
  const api = apiClient();
  const output = await api.article_retrieve(slug);
  return { props: output };
}

export default ServerSidePage;
