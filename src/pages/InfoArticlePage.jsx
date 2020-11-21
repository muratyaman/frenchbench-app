import React from 'react';
import { FbArticle, Loading, PublicLayout } from '../components';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { I18N_KEYS } from '../lib/i18n';
import { useArticleBySlug } from '../hooks/useArticleBySlug';

export function InfoArticlePage(props) {
  console.log('InfoArticlePage', props);
  const { ssr = false, hydrating = false, api, i18n, match, ssrData = {}, initialState = {} } = props;
  const { InfoArticlePage: initialData = {}, slug: initialSlug } = initialState || {};
  const slug = initialSlug ? initialSlug : (ssr ? ssrData.slug : match.params.slug);
  const currentUserState = useCurrentUser(api);
  const data = { ...ssrData, ...initialData };
  const csData = useArticleBySlug(api, ssr, hydrating, slug, data);
  let { loading, data: article = null, error = null } = csData;
  const title = article && article.title ? article.title : 'Article...';
  return (
    <PublicLayout title={title} currentUserState={currentUserState} i18n={i18n}>
      {error && <p>{i18n._(I18N_KEYS.article_not_found)}</p>}
      {loading && <Loading content={i18n._(I18N_KEYS.common_loading) + ' ...'} />}
      {article && <FbArticle {...article} />}
    </PublicLayout>
  );
}
