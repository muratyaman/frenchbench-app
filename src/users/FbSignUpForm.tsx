import { useState } from 'react';
import { Button, Checkbox, Form, Icon, Message, Segment } from 'semantic-ui-react';
import { FbLink } from '../components';
import { makeArticleLink } from '../makeRoutes';

export function FbSignUpForm({ i18n, onSubmit, onChange, errorMessage = null, successMessage = null, ...otherProps }) {
  const usernameLabel        = i18n._('account_username');
  const passwordLabel        = i18n._('account_password');
  const confirmPasswordLabel = i18n._('account_confirm_password');
  const signUpLabel          = i18n._('account_sign_up');
  const iAgreeLabel          = i18n._('account_sign_up_i_agree');
  
  const passwordRules        = i18n._('account_password_rules')
    .split('\n').map((line, idx) => (<span key={`${line}-${idx}`}>{line}<br /></span>));
  
  const [btnEnabled, setBtnEnabled] = useState(false);
  const onChangeAgree = (ev, data) => {
    setBtnEnabled(!!data.checked);
  }
  return (
    <Form onSubmit={onSubmit} {...otherProps} warning={!!errorMessage} success={!!successMessage}>
      <Form.Input
        icon='user'
        iconPosition='left'
        name='username'
        label={usernameLabel}
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
      <Form.Input
        icon='lock'
        iconPosition='left'
        name='password_confirm'
        label={confirmPasswordLabel}
        type='password'
        onChange={onChange}
      />
      
      <Message info><p>{passwordRules}</p></Message>
      
      {errorMessage && ( <Message warning header='Error' list={[ errorMessage ]} />)}
      
      {successMessage && ( <Message warning header='Success' list={[ successMessage ]} />)}

      <Form.Field>
        <Checkbox label={iAgreeLabel} onChange={onChangeAgree} />
      </Form.Field>

      <Segment>
        <Icon name='sticky note outline' />&nbsp;
        {i18n._('common_please_read')}&nbsp;
        <FbLink to={makeArticleLink({ slug: 'terms' })}>{i18n._('common_terms')}</FbLink>&nbsp;
        {i18n._('common_and')}&nbsp;
        <FbLink to={makeArticleLink({ slug: 'privacy' })}>{i18n._('common_privacy')}</FbLink>
      </Segment>

      <Button color='black' icon labelPosition='left' type='submit' disabled={!btnEnabled}><Icon name='signup' /> {signUpLabel}</Button>

    </Form>
  );
}
