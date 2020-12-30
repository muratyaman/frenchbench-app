import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbLink } from '../components';
import { FbGreatYouHere } from '../content';
import { SignUpForm } from '../users/SignUpForm';
import { useCurrentUser } from '../hooks/useCurrentUser';

const defaultPageData = {
  username: '',
  password: '',
  password_confirm: '',
  loading: false,
  errorMessage: null,
  successMessage: null,
};

export function InfoSignUpPage({ api, i18n }) {
  const history = useHistory();

  const currentUserState = useCurrentUser(api);
  if (currentUserState.data) { // special case
    history.push('/app/my/home'); // user signed in already, let's go to app
  }

  const [pageData, setPageData] = useState(defaultPageData);
  const { loading, errorMessage, successMessage } = pageData;

  const onChange = (name, value) => {
    setPageData({ ...pageData, [name]: value });
  }

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setPageData({ ...pageData, successMessage: null, errorMessage: null, loading: true });
    const { username, password, password_confirm } = pageData;
    try {
      const { data = null, error = null } = await api.signup({ username, password, password_confirm });
      if (data) { // success
        const { token, id: userId } = data;
        setPageData({ ...pageData, successMessage: 'success', loading: false });
        history.push('/app');
      } else {
        setPageData({ ...pageData, errorMessage: error, loading: false });
      }
    } catch (err) {
      setPageData({ ...pageData, errorMessage: err.message, loading: false });
    }
  }

  const formProps = {
    onSubmit,
    onChange,
    loading,
    errorMessage,
    successMessage,
    i18n,
  };

  const layoutProps = { title: 'Sign Up', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Header as='h2'>
        {i18n.account_sign_up()}
        <Header.Subheader>
          {i18n.account_signup_prompt()}
        </Header.Subheader>
      </Header>

      <Message info>
        <Message.Header>Please read</Message.Header>
        <div>
          <Icon name='sticky note outline' />
          &nbsp;<FbLink to='/terms'>{i18n.common_terms()}</FbLink>
          &nbsp;{i18n.common_and()}
          &nbsp;<FbLink to='/privacy'>{i18n.common_privacy()}</FbLink>
        </div>
      </Message>

      <Grid>

        <Grid.Column mobile={16} tablet={8} computer={8}>

          <Segment>
            <SignUpForm {...formProps} />
          </Segment>

          <Segment>
            <p>{i18n.account_if_account()}</p>
            <div>
              <FbLink href='/info/sign-in'>
                <Button icon labelPosition='left' color='purple' type='button'>
                  <Icon name='sign-in' /> {i18n.account_sign_in()}
                </Button>
              </FbLink>
            </div>
          </Segment>

        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbGreatYouHere />
        </Grid.Column>
        
      </Grid>
    </PublicLayout>
  );
}
