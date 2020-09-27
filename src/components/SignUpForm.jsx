import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

export function SignUpForm({ onSubmit, onChange, errorMessage = null, ...otherProps }) {
  return (
    <Form onSubmit={onSubmit} {...otherProps}>
      <Form.Input
        icon='user'
        iconPosition='left'
        name='username'
        label='Username'
        placeholder='Username'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password'
        label='Password'
        type='password'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password_confirm'
        label='Confirm Password'
        type='password'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      {!errorMessage ? null: (
        <Message
          warning
          header='Error'
          list={[ errorMessage ]}
        />
      )}
      <Button content='Sign Up' secondary type='submit' />
    </Form>
  )
}
