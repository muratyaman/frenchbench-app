import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbCallToAccount, FbCardHelpProvided, PublicLayout } from '../components';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { I18N_KEYS } from '../utils/i18n';

export function InfoICanHelpPage({ api, i18n }) {
  const currentUserState = useCurrentUser(api);
  return (
    <PublicLayout title="I Can Help" currentUserState={currentUserState} i18n={i18n}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardHelpProvided i18n={i18n} />
        </Grid.Column>
        {!currentUserState.data && (
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <FbCallToAccount i18n={i18n} />
          </Grid.Column>)}
      </Grid>
    </PublicLayout>
  );
}
