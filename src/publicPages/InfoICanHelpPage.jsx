import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpProvided } from '../content';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function InfoICanHelpPage({ api }) {
  const currentUserState = useCurrentUser(api);
  const layoutProps = { title: 'I Can Help', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardHelpProvided />
        </Grid.Column>

        {!currentUserState.data && (
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <FbCallToAccount />
          </Grid.Column>)}

      </Grid>
    </PublicLayout>
  );
}
