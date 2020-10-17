import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

export function SignUpForm({ onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
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
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password_confirm'
        label='Confirm Password'
        type='password'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Message info>
        <p>
          Password should have at least 8 characters<br />
          Use at least one lower case letter: a...z<br />
          Use at least one upper case letter: A...Z<br />
          Use at least one number: 0...9<br />
          Use at least one special character:<br />
          . , - _ &lt; &gt; ? ! @ $ ; : ( ) & % + - * / \
        </p>
      </Message>
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
      <Button content='Sign Up' secondary type='submit' />
    </Form>
  )
}
