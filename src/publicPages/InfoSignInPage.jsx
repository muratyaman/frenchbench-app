import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbLink } from '../components';
import { SignInForm } from '../users/SignInForm';
import { FbGreatYouHere } from '../content';
import { useCurrentUser } from '../hooks/useCurrentUser';

const defaultPageData = {
  username: '',
  password: '',
  loading: false,
  errorMessage: null,
  successMessage: null,
};

export function InfoSignInPage({ api, i18n }) {
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
    const { username, password } = pageData;
    setPageData({ ...pageData, successMessage: null, errorMessage: null, loading: true });
    
    try {
      const { data = null, error = null } = await api.signin({ username, password });
      if (data) { // success
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

  const layoutProps = { title: 'Sign In', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Header as='h2'>
        {i18n.account_sign_in()}
        <Header.Subheader>
          {i18n.account_signin_prompt()}
        </Header.Subheader>
      </Header>

      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          
          <Segment>
            <SignInForm {...formProps} />
          </Segment>

          <Segment>
            <p>{i18n.account_if_no_account()}</p>
            <div>
              <FbLink to='/info/sign-up'>
                <Button icon labelPosition='left' secondary type='button'>
                  <Icon name='signup' /> {i18n.account_sign_up()}
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
