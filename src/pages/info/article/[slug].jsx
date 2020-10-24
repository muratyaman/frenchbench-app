import React from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../../../lib/apiClient';
import { useCurrentUser } from '../../../lib/useCurrentUser';
import { FbArticle, Loading, PublicLayout } from '../../../components';

function ArticlePage(props) {
  const { data: article = {}, error: articleErr = null } = props;
  const router = useRouter();
  const api = apiClient();
  const currentUserState = useCurrentUser(api);
  return (
    <PublicLayout title={article.title} currentUserState={currentUserState}>
      {router.isFallback ? (
          <Loading />
        ) : (
          article?.slug ? (<FbArticle {...article} />) : (<p>article not found</p>)
        )
      }
    </PublicLayout>
  )
}

// this is done at runtime for each http request
// TODO: try using db directly and server-side cache
export async function getServerSideProps({ params }) {
  const api = apiClient();
  const { slug = null } = params;
  let output = null;
  if (slug) {
    output = await api.article_retrieve(slug);
  }
  return { props: output};
}

// TODO: chicken and egg situation for SSG as API and APP are on same codebase !!!
// getStaticPaths() and getStaticProps() are executed at build time

export default ArticlePage;
