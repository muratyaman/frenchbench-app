import React from 'react';
import { FbCallToAccount, FbCardCommunity, PublicLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

function ServerSidePage(props) {
  const api = apiClient();
  const currentUserState = useCurrentUser(api);
  return (
    <PublicLayout title='Home page' currentUserState={currentUserState}>
      <h1>Welcome</h1>
      <FbCardCommunity />
      {!currentUserState.data && <FbCallToAccount />}
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
