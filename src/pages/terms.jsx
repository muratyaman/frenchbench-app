import React from 'react';
import { PostSummary, PublicLayout } from '../components';

function Terms({ post }) {
  return (
    <PublicLayout title='Terms Of Service'>
      <div className='fb-terms'>
        <PostSummary {...post} />
      </div>
    </PublicLayout>
  );
}

/**
 * Next.js will pre-render this page on each request using the data returned by getServerSideProps()
 * @param ctx
 * @returns {Promise<{props: {data: []}}>}
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export async function getServerSideProps(ctx) {
  const { content } = require('../utils/serverSide');
  const post = content.terms;
  return { props: { post }};
}

export default Terms;
