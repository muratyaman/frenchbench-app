import React from 'react';
import { PublicLayout } from '../components';

function News({ data = [] }) {
  return (
    <PublicLayout title='News'>
      <p>news here...</p>

      {data.map(({ id, title, summary, created_at }, idx) => (
        <div key={`${id}-${idx}`}>
          <p>{title}</p>
          <p>{summary}</p>
          <p>{created_at}</p>
        </div>
      ))}

    </PublicLayout>
  )
}

/**
 * Next.js will pre-render this page at build time using getStaticProps()
 * @param ctx
 * @returns {Promise<{props: {data: []}}>}
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
News.getStaticProps = async (ctx) => {
  const data = [];
  return { props: { data }};
};

/**
 * Next.js will pre-render this page on each request using the data returned by getServerSideProps()
 * @param ctx
 * @returns {Promise<{props: {data: []}}>}
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 */
export async function getServerSideProps(ctx) {
  const data = [];
  return { props: { data }};
}

export default News;
