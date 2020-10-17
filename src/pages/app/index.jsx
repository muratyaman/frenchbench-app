import React from 'react';
import { Loading, PostSummaryList, Profile, ProtectedLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useMounted } from '../../lib/useMounted';
import { useCurrentUser } from '../../lib/useCurrentUser';

function ProtectedIndex({ topic = 'recent' }) {
  const api = apiClient();
  const isMounted = useMounted();
  const { data: user = null, loading, error } = useCurrentUser(api);
  const posts = [];

  return (
    <ProtectedLayout title='Home page' user={user}>

      {isMounted ? (
        <>
          
          { loading ? <Loading /> : error ? <p>{error}</p> : (<Profile user={user} />)}

          <div className='fb-post-list'>
            {posts && posts.length ? (
              <PostSummaryList posts={posts} />
            ) : (
              <p>home page you can see when you login - rendered on server</p>
            )}
          </div>
          
        </>
      ) : (
        <Loading />
      )}

    </ProtectedLayout>
  );
}

// export async function getServerSideProps({ query }) {
//   // TODO: capture our cookie (auth token)
//   const config = newConfigOnServer();
//   const { topic = 'recent' } = query;
//   const url = config.api.baseURL + '/posts?topic=' + topic;
//   const data = await fetcher(url);
//   return { props: { initialData: data, topic } };
// }


export default ProtectedIndex;
