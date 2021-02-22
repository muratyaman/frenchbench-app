import { Component, PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { ApiClient } from '../utils';
import { FbPostCreateForm } from './FbPostCreateForm';

export interface FbLoadMyNewPostPropsBase {
  api: ApiClient;
}

export type FbLoadMyNewPostProps = PropsWithChildren<FbLoadMyNewPostPropsBase>;

export class FbLoadMyNewPost extends Component<FbLoadMyNewPostProps> {

  state = {
    title: '',
    content: '',
    tags: '',
    asset_id: null, // uuid
    asset_file: null, // uuid.jpg
    loading: false,
    errorMessage: null,
    successMessage: null,
    redirect: null,
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  }
  
  onSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({ successMessage: null, errorMessage: null, loading: true });
    const { title, content, tags, asset_id } = this.state;
    try {
      const newPost = { title, content, tags, asset_id };
      const { data = null, error = null } = await this.props.api.post_create(newPost);
      if (data) { // success
        this.setState({ successMessage: 'success', loading: false, redirect: '/app/my/posts' });
      } else {
        this.setState({ errorMessage: error, loading: false });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
  }

  render(){
    const { api } = this.props;
    const { loading, errorMessage, successMessage, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />
    }
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
