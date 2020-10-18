import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Card, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { PublicLayout, RandomImage, SignUpForm } from '../../components';
import { apiClient } from '../../lib/apiClient';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password_confirm: '',
      loading: false,
      errorMessage: null,
      successMessage: null,
    };
    this.api = null;
  }

  componentDidMount() {
    console.log('SignUp.componentDidMount');
    this.api = apiClient();
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  }

  onSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({ successMessage: null, errorMessage: null, loading: true });
    const { username, password, password_confirm } = this.state;
    try {
      const { data = null, error = null } = await this.api.signup({ username, password, password_confirm });
      if (data) { // success
        const { token, id: userId } = data;
        this.setState({ successMessage: 'success', loading: false });
        Router.push('/app');
      } else {
        this.setState({ errorMessage: error, loading: false });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
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
      <PublicLayout title='Sign Up'>
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
    )
  }
}

export default SignUp;
