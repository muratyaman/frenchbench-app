import React from 'react';
import { apiClient } from '../../lib/apiClient';
import { articles } from '../../lib/articles';

const api = apiClient();

function ServerSidePage(props) {
  return (
    <div>
      <p>server page</p>
      <pre>{JSON.stringify(props)}</pre>
    </div>
  )
}

export async function getServerSideProps() {
  const slug = 'home';
  const post = articles.find(article => slug === article.slug);
  return { props: { post }};
}

export default ServerSidePage;
