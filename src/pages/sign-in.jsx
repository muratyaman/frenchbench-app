import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { PublicLayout, SignInForm } from '../components';
import Link from 'next/link';

function SignIn(props) {
  return (
    <PublicLayout title='Sign In'>
      <Header as='h2'>
        Sign In
        <Header.Subheader>
          Check what's happening in your neighbourhood
        </Header.Subheader>
      </Header>

      <Segment>
        <SignInForm />
      </Segment>

      <Segment>
        Please <Link href='/sign-up'>sign up</Link> if you do not have an account
      </Segment>
    </PublicLayout>
  )
}

export default SignIn;
