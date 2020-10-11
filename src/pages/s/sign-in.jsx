import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Header, Segment } from 'semantic-ui-react';
import { PublicLayout, SignInForm } from '../../components';
import { apiClient } from '../../lib/apiClient';

const api = apiClient();

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      errorMessage: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    console.log('SignIn.componentDidMount');
  }

  onSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({ successMessage: null, errorMessage: null, loading: true });
    const { username, password } = this.state;
    try {
      const { data = null, error = null } = await api.signin({ username, password });
      if (data) { // success
        this.setState({ successMessage: 'success', loading: false });
        Router.push('/c');
      } else {
        this.setState({ errorMessage: error, loading: false });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { loading, errorMessage, successMessage } = this.state;
    const formProps = {
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      loading,
      errorMessage,
      //successMessage,
    };

    return (
      <PublicLayout title='Sign In'>
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
          Please <Link href='/s/sign-up'>sign up</Link> if you do not have an account
        </Segment>
      </PublicLayout>
    );
  }
}

export default SignIn;