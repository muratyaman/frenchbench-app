import React from 'react';
import { FbLink } from './FbLink';
import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { FbGreatYouHere } from './FbGreatYouHere';

export function FbCallToAccount({ i18n }) {
  return (
    <>
      <Segment>
        <Grid columns={2}>
          <Grid.Column textAlign='center'>
            <Header as='h5'>You have an account</Header>
            <FbLink to='/info/sign-in'>
              <Button icon labelPosition='left' color='purple' size='small' type='button'><Icon name='sign-in' />Sign In</Button>
            </FbLink>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Header as='h5'>Have one in a minute</Header>
            <FbLink to='/info/sign-up'>
              <Button icon labelPosition='left' secondary size='small' type='button'><Icon name='signup' />Sign up</Button>
            </FbLink>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      
      <FbGreatYouHere i18n={i18n} />
    </>
  )
}
