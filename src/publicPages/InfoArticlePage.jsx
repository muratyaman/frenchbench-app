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
      {error && <p>{i18n.article_not_found()}</p>}
      
      {loading && <Loading content={i18n.common_loading()} />}
      
      {article && <Grid>
        <Grid.Column only='computer' computer={2} />
        <Grid.Column mobile={16} table={16} computer={12}>
          <FbArticle {...article} />
        </Grid.Column>
        <Grid.Column only='computer' computer={2} />
      </Grid>}
      
    </PublicLayout>
  );
}
