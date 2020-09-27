import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

export function SignInForm({ onSubmit, onChange, errorMessage = null, ...otherProps }) {
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage}>
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
      <Button content='Sign In' primary type='submit' />

      {!errorMessage ? null: (
        <Message
          warning
          header='Error'
          list={[ errorMessage ]}
        />
      )}

    </Form>
  )
}
