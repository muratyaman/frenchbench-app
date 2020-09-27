import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../utils/common';
import { PostSummaryList, Profile, ProtectedLayout } from '../../components';
import { newConfigOnServer } from '../../utils/serverSide';
import { newConfigOnClient } from '../../utils/clientSide';

function ProtectedIndex({ initialData, topic = 'recent' }) {
  const config = newConfigOnClient();
  const url = config.api.baseURL + '/posts?topic=' + topic;
  const { data: posts = [] } = useSWR(url, fetcher, { initialData })
  // const posts = [];

  return (
    <ProtectedLayout title='Home page'>

      <Profile />

      <div className='fb-post-list'>
        {posts && posts.length ? (
          <PostSummaryList posts={posts} />
        ) : (
          <p>home page you can see when you login - rendered on server</p>
        )}
      </div>

    </ProtectedLayout>
  );
}

export async function getServerSideProps({ query }) {
  // TODO: capture our cookie (auth token)
  const config = newConfigOnServer();
  const { topic = 'recent' } = query;
  const url = config.api.baseURL + '/posts?topic=' + topic;
  const data = await fetcher(url);
  return { props: { initialData: data, topic } };
}


export default ProtectedIndex;
