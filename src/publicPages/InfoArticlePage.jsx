import React from 'react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbGridCardContainer, Loading } from '../components';
import { FbArticle } from '../articles/FbArticle';
import { useArticleBySlug } from '../hooks/useArticleBySlug';

export function InfoArticlePage(props) {
  const { api, i18n, ssr = false, hydrating = false, match, ssrData = {}, initialState = {} } = props;

  const { InfoArticlePage: initialData = {}, slug: initialSlug } = initialState ?? {};
  const slug = initialSlug ? initialSlug : (ssr ? ssrData.slug : match.params.slug);
  const data = { ...ssrData, ...initialData };
  const csData = useArticleBySlug(api, ssr, hydrating, slug, data);
  let { loading, data: article = null, error = null } = csData;
  const title = article && article.title ? article.title : 'Article...';
  const layoutProps = { title };
  return (
    <PublicLayout {...layoutProps}>
      <FbGridCardContainer>
        {loading && <Loading />}
        {!article && <p>{i18n.article_not_found()}</p>}
        {article && (<FbArticle {...article} />)}
      </FbGridCardContainer>
    </PublicLayout>
  );
}
