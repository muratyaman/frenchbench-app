import React from 'react';
import { Grid } from 'semantic-ui-react';
import { FbCallToAccount, FbCardHelpNeeded, PublicLayout } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

function ICanHelp(props) {
  const api = apiClient();
  const currentUserState = useCurrentUser(api);
  return (
    <PublicLayout title="I Need Help" currentUserState={currentUserState}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbCardHelpNeeded />
        </Grid.Column>
        {!currentUserState.data && <Grid.Column mobile={16} tablet={8} computer={8}><FbCallToAccount /></Grid.Column>}
      </Grid>
    </PublicLayout>
  );
}

export default ICanHelp;
