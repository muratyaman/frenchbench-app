import React from 'react';
import { PostSummary, PublicLayout } from '../components';

function About({ post }) {
  return (
    <PublicLayout title='About Us'>
      <PostSummary {...post} />
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
  const post = content.about;
  return { props: { post }};
}

export default About;
