import { Component, PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { FbPropsWithApiAndI18n } from '../types';
import { FbAdvertCreateForm } from './FbAdvertCreateForm';

export interface FbLoadMyNewAdvertPropsBase extends FbPropsWithApiAndI18n {

}

export type FbLoadMyNewAdvertProps = PropsWithChildren<FbLoadMyNewAdvertPropsBase>;

export class FbLoadMyNewAdvert extends Component<FbLoadMyNewAdvertProps> {

  state = {
    title: '',
    content: '',
    tags: '',
    is_buying: '0',
    is_service: '0',
    currency: 'GBP',
    price: 0.0,
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
    const { title, content, tags, asset_id, price } = this.state;
    try {
      const { data = null, error = null } = await this.props.api.advert_create({ title, content, tags, asset_id, price });
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
    const { api, i18n } = this.props;
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
      i18n,
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
