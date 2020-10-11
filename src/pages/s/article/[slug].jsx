import React from 'react';
import { useRouter } from 'next/router';
import { articles } from '../../../lib/articles';
import { PostSummary, PublicLayout } from '../../../components';

function ArticlePage({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <p>page not found</p>
  }
  return (
    <PublicLayout title={post.title}>
      <PostSummary {...post} />
    </PublicLayout>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = articles.find(article => slug === article.slug);
  return { props: { post }};
}

export async function getStaticPaths() {
  return {
    paths: articles.map(({ slug }) => `/s/article/${slug}`) || [],
    fallback: false,
  }
}

export default ArticlePage;
