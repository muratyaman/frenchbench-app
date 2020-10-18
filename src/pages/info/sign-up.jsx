import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, Header, Icon, Message, Segment } from 'semantic-ui-react';
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
  const userState = useCurrentUser(api);
  const router = useRouter();

  if (userState.data) { // special case
    setTimeout(() => { router.push('/app/my/home') }, 500); // user signed in already, let's go to app
  }

  const { loading, errorMessage, successMessage } = pageData;
  const formProps = {
    onSubmit,
    onChange,
    loading,
    errorMessage,
    successMessage,
  };

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
        router.push('/app');
      } else {
        setPageData({ ...pageData, errorMessage: error, loading: false });
      }
    } catch (err) {
      setPageData({ ...pageData, errorMessage: err.message, loading: false });
    }
  }

  return (
    <PublicLayout title='Sign Up' userState={userState}>
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

      <Segment>
        <SignUpForm {...formProps} />
      </Segment>

      <Segment>
        Please <Link href='/info/sign-in'>sign in</Link> if you have an account
      </Segment>

      <Card>
        <RandomImage keywords='signup' />
      </Card>

    </PublicLayout>
  );
}

export default SignUp;
