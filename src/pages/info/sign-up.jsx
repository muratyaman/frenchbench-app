import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { PublicLayout, RandomImage, SignUpForm } from '../../components';
import { apiClient } from '../../lib/apiClient';
import { useCurrentUser } from '../../lib/useCurrentUser';

const defaultPageData = {
  username: '',
  password: '',
  password_confirm: '',
  loading: false,
  errorMessage: null,
  successMessage: null,
};

function SignUp(props) {
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
    this.setState({ successMessage: null, errorMessage: null, loading: true });
    const { username, password, password_confirm } = this.state;
    try {
      const { data = null, error = null } = await api.signup({ username, password, password_confirm });
      if (data) { // success
        const { token, id: userId } = data;
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
    <PublicLayout title='Sign Up' currentUserState={currentUserState}>
      <Header as='h2'>
        Sign Up
        <Header.Subheader>
          You can manage your account later
        </Header.Subheader>
      </Header>

      <Message info>
        <Message.Header>Please read</Message.Header>
        <div>
          <Icon name='sticky note outline' />&nbsp;<Link href='/terms'>Terms of Service</Link> and&nbsp;<Link href='/privacy'>Privacy Policy</Link>
        </div>
      </Message>

      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment>
            <SignUpForm {...formProps} />
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment>
            <p>If you have an account</p>
            <div>
              <Link href='/info/sign-in'>
                <Button icon labelPosition='left' color='purple'><Icon name='sign-in' /> Sign in</Button>
              </Link>
            </div>
          </Segment>
          <Segment className='fb-rand-img'>
            <RandomImage keywords='welcome' />
            <p align='center'>It's great to have you here</p>
          </Segment>
        </Grid.Column>
      </Grid>

    </PublicLayout>
  );
}

export default SignUp;
