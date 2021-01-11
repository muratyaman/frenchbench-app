import React from 'react';
import { Grid } from 'semantic-ui-react';

export function FbGridCardContainer({ children }) {
  return (
    <Grid>
      <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={8}>
        {children}
      </Grid.Column>
      <Grid.Column mobile={0} tablet={3} computer={4}></Grid.Column>
    </Grid>
  )
}
