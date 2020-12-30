import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardCommunity, FbCardIdea } from '../content';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function IndexPage({ api, i18n }) {
  const currentUserState = useCurrentUser(api);
  const layoutProps = { title: 'Home page', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <h1>{i18n.home_welcome()}</h1>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardCommunity />
        </Grid.Column>
        
        {!currentUserState.data && 
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <FbCallToAccount />
          </Grid.Column>}
        
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardIdea title={i18n.home_loneliness()} keywords='loneliness' idea={i18n.home_loneliness_quote()} />
        </Grid.Column>
      </Grid>
    </PublicLayout>
  )
}
