import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';

export function SignInForm({ onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
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
      <Button icon labelPosition='left' color='purple' type='submit'><Icon name='sign-in' /> Sign In</Button>
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
    </Form>
  )
}
