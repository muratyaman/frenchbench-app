import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export function SignInForm(props) {
  return (
    <Form>
      <Form.Input
        icon='user'
        iconPosition='left'
        label='Username'
        placeholder='Username'
      />
      <Form.Input
        icon='lock'
        iconPosition='left'
        label='Password'
        type='password'
      />
      <Button content='Sign In' primary />
    </Form>
  )
}
