import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';

export function FbSignInForm({ i18n, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const usernameLabel = i18n._('account_username');
  const passwordLabel = i18n._('account_password');
  const signInLabel = i18n._('account_sign_in');
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Input
        icon='user'
        iconPosition='left'
        name='username'
        label={usernameLabel}
        placeholder={usernameLabel}
        onChange={onChange}
      />
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password'
        label={passwordLabel}
        type='password'
        onChange={onChange}
      />
      <Button icon labelPosition='left' color='purple' type='submit'><Icon name='sign-in' /> {signInLabel}</Button>
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
    </Form>
  )
}
