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
      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <h1>{i18n.home_welcome()}</h1>
          <FbCardCommunity i18n={i18n} />
        </Grid.Column>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <FbCardIdea title={i18n.ideas_loneliness()} keywords='loneliness' idea={i18n.ideas_loneliness_quote()} />
        </Grid.Column>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <FbCardIdea title={i18n.ideas_neighbourless()} keywords='neighbor' idea={i18n.ideas_neighbourless_quote()} />
        </Grid.Column>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <FbCardIdea title={i18n.ideas_strangers()} keywords='friend' idea={i18n.ideas_strangers_quote()} />
        </Grid.Column>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
      </Grid>

      {!currentUserState.data && (
        <Grid>
          <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
          <Grid.Column mobile={16} tablet={10} computer={8}>
            <FbCallToAccount i18n={i18n} />
          </Grid.Column>
          <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        </Grid>
      )}

    </PublicLayout>
  );
}
