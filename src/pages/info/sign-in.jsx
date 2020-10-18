import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Header, Segment } from 'semantic-ui-react';
import { PublicLayout, SignInForm } from '../../components';
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
  const userState = useCurrentUser(api);

  if (userState.data) { // special case
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
    <PublicLayout title='Sign In' userState={userState}>
      <Header as='h2'>
        Sign In
        <Header.Subheader>
          Check what's happening in your neighbourhood
        </Header.Subheader>
      </Header>

      <Segment>
        <SignInForm {...formProps} />
      </Segment>

      <Segment>
        Please <Link href='/info/sign-up'>sign up</Link> if you do not have an account
      </Segment>
    </PublicLayout>
  );
}

export default SignIn;
