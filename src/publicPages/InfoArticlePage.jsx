import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { Loading } from '../components';
import { FbArticle } from '../articles/FbArticle';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useArticleBySlug } from '../hooks/useArticleBySlug';

export function InfoArticlePage(props) {
  const { api, i18n, ssr = false, hydrating = false, match, ssrData = {}, initialState = {} } = props;
  const currentUserState = useCurrentUser(api);

  const { InfoArticlePage: initialData = {}, slug: initialSlug } = initialState ?? {};
  const slug = initialSlug ? initialSlug : (ssr ? ssrData.slug : match.params.slug);
  const data = { ...ssrData, ...initialData };
  const csData = useArticleBySlug(api, ssr, hydrating, slug, data);
  let { loading, data: article = null, error = null } = csData;
  const title = article && article.title ? article.title : 'Article...';
  const layoutProps = { title, currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4} />
        <Grid.Column mobile={16} tablet={10} computer={8}>
          {loading && <Loading content={i18n.common_loading()} />}
          {!article && <p>{i18n.article_not_found()}</p>}
          {article && (<FbArticle {...article} />)}
        </Grid.Column>
        <Grid.Column mobile={0} tablet={3} computer={4} />
      </Grid>
      
    </PublicLayout>
  );
}
