import { Component, PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { defaultLocationFormData, FbGeoLocation } from '../geoLocation/glUtils';
import { makeMyAdvertsLink } from '../makeRoutes';
import { FbPropsWithApiAndI18n } from '../types';
import { FbAdvertCreateForm } from './FbAdvertCreateForm';

export interface FbMyNewAdvertLoaderPropsBase extends FbPropsWithApiAndI18n {
  location?: FbGeoLocation | null;
}

export type FbMyNewAdvertLoaderProps = PropsWithChildren<FbMyNewAdvertLoaderPropsBase>;

export interface FbMyNewAdvertLoaderState extends Record<string, any> {
  // form data
  title: string;
  content: string;
  tags: string;
  is_buying: string;
  is_service: string;
  currency: string;
  price: number;
  lat: number;
  lon: number;
  geo_accuracy: number;
  asset_id: string | null;
  asset_file: string | null;
  // other props
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  redirect: string | null;
}

const defaultState: FbMyNewAdvertLoaderState = {
  // form data
  title: '',
  content: '',
  tags: '',
  is_buying: '0',
  is_service: '0',
  currency: 'GBP',
  price: 0.0,
  ...defaultLocationFormData,
  asset_id: null, // uuid
  asset_file: null, // uuid.jpg
  // other props
  loading: false,
  errorMessage: null,
  successMessage: null,
  redirect: null,
};

export class FbMyNewAdvertLoader extends Component<FbMyNewAdvertLoaderProps, FbMyNewAdvertLoaderState> {
  constructor(props: FbMyNewAdvertLoaderProps) {
    super(props);
    this.state = defaultState;
    const { location } = props;
    if (location) {
      const { latitude, longitude, accuracy } = location.coords;
      this.state = {
        ...defaultState,
        lat: latitude,
        lon: longitude,
        geo_accuracy: accuracy,
      };
    }
  }

  onChange = (name: string, value: string | null) => {
    this.setState({ [name]: value });
  }
  
  onSubmit = async (ev) => {
    ev.preventDefault();
    this.setState({ successMessage: null, errorMessage: null, loading: true });
    const { title, content, tags, asset_id, price, lat, lon, geo_accuracy } = this.state;
    try {
      const newAdvert = { title, content, tags, asset_id, price, lat, lon, geo_accuracy };
      const { data = null, error = null } = await this.props.api.advert_create(newAdvert);
      if (data) { // success
        this.setState({ successMessage: 'success', loading: false, redirect: makeMyAdvertsLink() });
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
