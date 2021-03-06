import React from 'react';
import { useParams } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbGridCardContainer, FbLoading } from '../components';
import { FbArticle } from '../articles/FbArticle';
import { useArticleBySlug } from '../hooks/useArticleBySlug';

export function InfoArticlePage(props) {
  console.log('InfoArticlePage props', props);
  const { api, i18n, ssr = false, hydrating = false, ssrData = {}, initialState = {} } = props;
  const params = useParams();
  console.log('InfoArticlePage params', params);
  const { InfoArticlePage: initialData = {}, slug: initialSlug } = initialState ?? {};
  const slug = initialSlug ? initialSlug : (ssr ? ssrData.slug : params.slug);
  const data = { ...ssrData, ...initialData };
  const csData = useArticleBySlug(api, ssr, hydrating, slug, data);
  let { loading, data: article = null, error = null } = csData;
  const title = article && article.title ? article.title : 'Article...';
  const layoutProps = { title };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        {loading && <FbLoading />}
        {!loading && !article && <p>{i18n._('article_not_found')}</p>}
        {!loading && article && (<FbArticle {...article} />)}
      </FbGridCardContainer>
    </PublicLayout>
  );
}
