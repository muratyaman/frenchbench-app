import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { PublicLayout } from '../layouts/PublicLayout';
import { FbLink } from '../components';
import { FbGreatYouHere } from '../content';
import { FbSignUpForm } from '../users/FbSignUpForm';
import { FbCurrentUserContext } from '../users/FbCurrentUserContext';

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

  const currentUserState = useContext(FbCurrentUserContext);

  if (currentUserState.data) { // special case
    history.push('/app'); // user signed in already, let's go to app
  }

  const [pageData, setPageData] = useState(defaultPageData);
  const { loading, errorMessage, successMessage } = pageData;

  const onChange = (ev, { name, value }) => {
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
        
        await currentUserState.reload(); // reload context, we have new session

        history.push('/app');
      } else {
        setPageData({ ...pageData, errorMessage: error, loading: false });
      }
    } catch (err) {
      setPageData({ ...pageData, errorMessage: err.message, loading: false });
    }
  }

  const formProps = {
    i18n,
    onSubmit,
    onChange,
    loading,
    errorMessage,
    successMessage,
  };

  const layoutProps = { title: 'Sign Up', currentUserState };
  return (
    <PublicLayout {...layoutProps}>
      <Header as='h2'>
        {i18n._('account_sign_up')}
        <Header.Subheader>
          {i18n._('account_signup_prompt')}
        </Header.Subheader>
      </Header>

      <Grid container>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment>
            <FbSignUpForm {...formProps} />
          </Segment>

          <Segment>
            <p>{i18n._('account_if_account')}</p>
            <div>
              <FbLink href='/info/sign-in'>
                <Button icon labelPosition='left' color='purple' type='button'>
                  <Icon name='sign-in' /> {i18n._('account_sign_in')}
                </Button>
              </FbLink>
            </div>
          </Segment>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={8}>
          <FbGreatYouHere i18n={i18n} />
        </Grid.Column>
      </Grid>
    </PublicLayout>
  );
}
