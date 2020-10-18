import React from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '../../../lib/apiClient';
import { useCurrentUser } from '../../../lib/useCurrentUser';
import { FbArticle, Loading, PublicLayout } from '../../../components';

function ArticlePage(props) {
  const { data: article = {}, error: articleErr = null } = props;
  console.log(' ');
  console.log('/info/article/[slug] ArticlePage()', props);
  console.log(' ');
  const router = useRouter();
  const api = apiClient();
  const userState = useCurrentUser(api);
  return (
    <PublicLayout title={article.title} userState={userState}>
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
  console.log(' ');
  console.log('/info/article/[slug] getServerSideProps()');
  console.log(params);
  console.log(' ');
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

// export async function getStaticProps({ params }) {
//   console.log(' ');
//   console.log('/info/article/[slug] getStaticProps()');
//   console.log(' ');
//   const api = apiClient();
//   const { slug } = params;
//   const { data: article } = await api.article_retrieve(slug);
//   return { props: { article }};
// }

// export async function getStaticPaths() {
//   console.log(' ');
//   console.log('/info/article/[slug] getStaticPaths()');
//   console.log(' ');
//   //const api = apiClient();
//   //const { data: articles } = await api.article_search();
//   const articles = [
//     { slug: 'home'},
//     { slug: 'about' },
//     { slug: 'contact'},
//     { slug: 'terms' },
//     { slug: 'privacy' },
//   ];
//   return {
//     paths: articles.map(({ slug }) => `/info/article/${slug}`),
//     fallback: false,
//   }
// }

export default ArticlePage;
