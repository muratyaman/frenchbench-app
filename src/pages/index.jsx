import React, { useEffect, useState } from 'react';
import { FbCallToAccount, FbCardCommunity, Loading, PublicLayout } from '../components';

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

// public home page
function PublicIndex(props) {
  const isMounted = useMounted();
  return (
    <PublicLayout title='Home page'>
      <h1>Welcome</h1>

      <FbCardCommunity />

      <FbCallToAccount />

      <hr />
      <p>rendered on server-side</p>

      {isMounted ? (
        <section>rendered on client-side</section>
      ) : (
        <Loading />
      )}
    </PublicLayout>
  );
}

export default PublicIndex;
