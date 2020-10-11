import React from 'react';
import { Loading, PostSummaryList, Profile, ProtectedLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useMounted } from '../../lib/useMounted';
import { useCurrentUser } from '../../lib/useCurrentUser';

const api = apiClient();

function ProtectedIndex({ topic = 'recent' }) {
  const isMounted = useMounted();
  const { data: user, loading, error } = useCurrentUser(api);
  const posts = [];

  return (
    <ProtectedLayout title='Home page'>

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
