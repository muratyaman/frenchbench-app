import React from 'react';
import { FbCallToAccount, FbCardCommunity, PublicLayout } from '../components';

// public home page
function PublicIndex(props) {
  return (
    <PublicLayout title='Home page'>
      <h1>Welcome</h1>
      <FbCardCommunity />
      <FbCallToAccount />
    </PublicLayout>
  );
}

export default PublicIndex;
