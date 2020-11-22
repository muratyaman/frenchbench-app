import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbCallToAccount, FbCardCommunity, FbCardIdea, PublicLayout } from '../components';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { I18N_KEYS } from '../utils/i18n';

export function IndexPage({ api, i18n }) {
  const currentUserState = useCurrentUser(api);
  return (
    <PublicLayout title='Home page' currentUserState={currentUserState} i18n={i18n}>
      <h1>{i18n._(I18N_KEYS.home_welcome)}</h1>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardCommunity i18n={i18n} />
        </Grid.Column>
        
        {!currentUserState.data && 
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <FbCallToAccount i18n={i18n} />
          </Grid.Column>}
        
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardIdea title={i18n._(I18N_KEYS.home_loneliness)} keywords='loneliness' idea={i18n._(I18N_KEYS.home_loneliness_quote)} />
        </Grid.Column>
      </Grid>
    </PublicLayout>
  )
}
