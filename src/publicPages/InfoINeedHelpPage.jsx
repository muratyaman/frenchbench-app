import React from 'react';
import { Grid } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbCallToAccount, FbCardHelpNeeded } from '../content';
import { useCurrentUser } from '../hooks/useCurrentUser';

export function InfoINeedHelpPage({ api, i18n }) {
  const currentUserState = useCurrentUser(api);
  const layoutProps = { title: 'I Need Help', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardHelpNeeded i18n={i18n} />
        </Grid.Column>

        {!currentUserState.data && (
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <FbCallToAccount i18n={i18n} />
          </Grid.Column>)}

      </Grid>
    </PublicLayout>
  );
}
