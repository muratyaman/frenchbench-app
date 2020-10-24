import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import { PublicLayout, RandomImage, SignInForm } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

const defaultPageData = {
  username: '',
  password: '',
  loading: false,
  errorMessage: null,
  successMessage: null,
};

function SignIn(props) {
  const [pageData, setPageData] = useState(defaultPageData);
  const api = apiClient();
  const currentUserState = useCurrentUser(api);

  if (currentUserState.data) { // special case
    setTimeout(() => { Router.push('/app/my/home') }, 500); // user signed in already, let's go to app
  }

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
        Router.push('/app');
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
  };

  return (
    <PublicLayout title='Sign In' currentUserState={currentUserState}>
      <Header as='h2'>
        Sign In
        <Header.Subheader>
          Check what's happening in your neighbourhood
        </Header.Subheader>
      </Header>

      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment>
            <SignInForm {...formProps} />
          </Segment>
          <Segment>
            <p>If you do not have an account</p>
            <div>
              <Link href='/info/sign-up'>
                <Button icon labelPosition='left' secondary><Icon name='signup' /> Sign up</Button>
              </Link>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment className='fb-rand-img'>
            <RandomImage keywords='welcome' />
            <p align='center'>It's great to have you here</p>
          </Segment>
        </Grid.Column>
      </Grid>
    </PublicLayout>
  );
}

export default SignIn;
