import React from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';

export function SignUpForm({ i18n, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const usernameLabel = i18n.account_username();
  const passwordLabel = i18n.account_password();
  const confirmPasswordLabel = i18n.account_confirm_password();
  const signUpLabel = i18n.account_sign_up();
  const passwordRules = i18n.account_password_rules()
    .split('\n').map((line, idx) => (<span key={`${line}-${idx}`}>{line}<br /></span>));
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Input
        icon='user'
        iconPosition='left'
        name='username'
        label={usernameLabel}
        placeholder={usernameLabel}
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password'
        label={passwordLabel}
        type='password'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password_confirm'
        label={confirmPasswordLabel}
        type='password'
        onChange={(e, { name, value }) => onChange(name, value)}
      />
      <Message info><p>{passwordRules}</p></Message>
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}
      <Button color='black' icon labelPosition='left' type='submit'><Icon name='signup' /> {signUpLabel}</Button>
    </Form>
  )
}
