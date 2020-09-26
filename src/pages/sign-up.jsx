import React from 'react';
import { Header, Icon, Message, Segment } from 'semantic-ui-react';
import { PublicLayout, RandomImage, SignUpForm } from '../components';
import Link from 'next/link';

function SignUp(props) {
  return (
    <PublicLayout title='Sign Up'>
      <Header as='h2'>
        Sign Up
        <Header.Subheader>
          You can manage your account later
        </Header.Subheader>
      </Header>

      <Message info>
        <Message.Header>Please read</Message.Header>
        <div>
          <Icon name='sticky note outline' />&nbsp;<Link href='/terms'>Terms of Service</Link> and&nbsp;<Link href='/privacy'>Privacy Policy</Link>
        </div>
      </Message>

      <Segment>
        <SignUpForm />
      </Segment>

      <Segment>
        Please <Link href='/sign-in'>sign in</Link> if you have an account
      </Segment>

      <Segment>
        <div>
          <RandomImage keywords='signup' />
        </div>
      </Segment>

    </PublicLayout>
  )
}

export default SignUp;
