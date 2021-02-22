import React from 'react';
import { Grid } from 'semantic-ui-react';

export function FbGridCardContainer({ children }) {
  return (
    <Grid>
      <Grid.Column only="tablet" tablet={3}></Grid.Column>
      <Grid.Column only="computer" computer={4}></Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={8}>
        {children}
      </Grid.Column>
      <Grid.Column only="tablet" tablet={3}></Grid.Column>
      <Grid.Column only="computer" computer={4}></Grid.Column>
    </Grid>
  )
}
