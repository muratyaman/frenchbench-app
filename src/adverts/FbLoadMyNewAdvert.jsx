import React from 'react';
import { Redirect } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

export class FbLoadMyNewAdvert extends React.Component {

  state = {
    title: '',
    content: '',
    tags: '',
    is_buying: '0',
    is_service: '0',
    currency: 'GBP',
    price: '0.00',
    lat: 0.0,
    lon: 0.0,
    geo_accuracy: 9999,
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
      const { data = null, error = null } = await this.props.api.advert_create({ title, content, tags, asset_id });
      if (data) { // success
        this.setState({ successMessage: 'success', loading: false, redirect: '/app/my/adverts' });
      } else {
        this.setState({ errorMessage: error, loading: false });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message, loading: false });
    }
  }

  render(){
    const { api, currentUserState } = this.props;
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
      formData: this.state,
    };
    return (
      <div className='fb-section'>
        <Segment raised>
          <FbAdvertCreateForm {...formProps} />
        </Segment>
      </div>
    )
  }
}
