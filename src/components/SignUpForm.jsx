import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export function SignUpForm(props) {
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
      <Form.Input
        icon='lock'
        iconPosition='left'
        label='Confirm Password'
        type='password'
      />
      <Button content='Sign Up' secondary />
    </Form>
  )
}
