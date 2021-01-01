import React from 'react';
import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { FbLink } from '../components';
import { FbGreatYouHere } from './FbGreatYouHere';

export function FbCallToAccount({ i18n }) {
  return (
    <>
      <Segment>
        <Grid columns={2}>
          <Grid.Column textAlign='center'>
            <Header as='h5'>{i18n.account_you_have_an_account()}</Header>
            <FbLink to='/info/sign-in'>
              <Button icon labelPosition='left' color='purple' size='small' type='button'><Icon name='sign-in' />{i18n.account_sign_in()}</Button>
            </FbLink>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <Header as='h5'>{i18n.account_have_one_in_a_minute()}</Header>
            <FbLink to='/info/sign-up'>
              <Button icon labelPosition='left' secondary size='small' type='button'><Icon name='signup' />{i18n.account_sign_up()}</Button>
            </FbLink>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      
      <FbGreatYouHere i18n={i18n} />
    </>
  )
}
