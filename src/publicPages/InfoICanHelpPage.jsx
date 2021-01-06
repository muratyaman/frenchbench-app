import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpProvided, FbCardIdea } from '../content';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function InfoICanHelpPage({ api, i18n }) {
  const currentUserState = useCurrentUser(api);
  const layoutProps = { title: 'I Can Help', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <FbCardHelpProvided i18n={i18n} />
        </Grid.Column>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
      </Grid>

      <Grid>
        <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
        <Grid.Column mobile={16} tablet={10} computer={8}>
          <FbCardIdea title={i18n.ideas_true_neighbour()} keywords='neighbor' idea={i18n.ideas_true_neighbour_quote()} />
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
