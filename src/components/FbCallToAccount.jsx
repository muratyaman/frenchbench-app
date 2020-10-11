import React from 'react';
import Link from 'next/link';
import { Icon, Message } from 'semantic-ui-react';

export function FbCallToAccount(props) {
  return (
    <Message warning>
      <Message.Header>Do you have an account?</Message.Header>
      <div>
        <b>Yes</b> <Icon name='long arrow alternate right' /> <Link href='/s/sign-in'>Please sign In</Link>
      </div>
      <hr />
      <div>
        <b>No</b> <Icon name='long arrow alternate right' /> <Link href='/s/sign-up'>Please sign up</Link>
      </div>
      <div><i>* It takes only a minute</i></div>
    </Message>
  )
}
