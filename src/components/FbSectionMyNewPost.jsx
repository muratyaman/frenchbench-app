import React from 'react';
import Router from 'next/router';
import { Segment } from 'semantic-ui-react';
import { FbPostCreateForm } from './FbPostCreateForm';

export class FbSectionMyNewPost extends React.Component {

  state = {
    title: '',
    content: '',
    tags: '',
    loading: false,
    errorMessage: null,
    successMessage: null,
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  }
  
  onSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({ successMessage: null, errorMessage: null, loading: true });
    const { title, content, tags} = this.state;
    try {
      const { data = null, error = null } = await this.props.api.post_create({ title, content, tags });
      if (data) { // success
        this.setState({ successMessage: 'success', loading: false });
        Router.push('/app/my/posts');
      } else {
        this.setState({ errorMessage: error, loading: false });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
  }

  render(){
    const { api } = this.props;
    const { loading, errorMessage, successMessage } = this.state;
    const formProps = {
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      loading,
      errorMessage,
      successMessage,
      api,
    };
    return (
      <div className='fb-section'>
        <Segment raised>
          <FbPostCreateForm {...formProps} />
        </Segment>
      </div>
    )
  }
}
