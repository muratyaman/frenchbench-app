import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpNeeded, FbCardIdea } from '../content';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function InfoINeedHelpPage({ api, i18n }) {
  const currentUserState = useCurrentUser(api);
  const layoutProps = { title: 'I Need Help', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <FbCardHelpNeeded i18n={i18n} />
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
