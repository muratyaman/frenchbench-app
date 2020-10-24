import React from 'react';
import Link from 'next/link';
import { Button, Divider, Grid, Header, Icon, Label, Segment } from 'semantic-ui-react';
import { RandomImage } from './RandomImage';

export function FbCallToAccount(props) {
  return (
    <>
      <Segment>
        <Grid columns={2} relaxed stackable>
          <Grid.Column verticalAlign='top'>
            <Header>You have an account</Header>
            <Link href='/info/sign-in'>
              <Button icon labelPosition='left' color='purple'><Icon name='sign-in' />Sign In</Button>
            </Link>
          </Grid.Column>

          <Grid.Column verticalAlign='top'>
            <Header>Have one in a minute</Header>
            <Link href='/info/sign-up'>
              <Button icon labelPosition='left' secondary><Icon name='signup' />Sign up</Button>
            </Link>
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      
      <Segment className='fb-rand-img'>
        <RandomImage keywords='welcome' />
        <p align='center'>It's great to have you here</p>
      </Segment>
    </>
  )
}
