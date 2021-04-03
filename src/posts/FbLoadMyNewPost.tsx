import { Component, PropsWithChildren } from 'react';
import { Redirect } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import { defaultLocationFormData, FbGeoLocation } from '../geoLocation/glUtils';
import { makeMyPostsLink } from '../makeRoutes';
import { FbPropsWithApiAndI18n } from '../types';
import { FbPostCreateForm } from './FbPostCreateForm';

export interface FbLoadMyNewPostPropsBase extends FbPropsWithApiAndI18n {
  location?: FbGeoLocation | null;
}

export type FbLoadMyNewPostProps = PropsWithChildren<FbLoadMyNewPostPropsBase>;

export interface FbLoadMyNewPostState extends Record<string, any> {
  // form data
  title: string;
  content: string;
  tags: string;
  asset_id: string | null;
  asset_file: string | null;
  lat: number;
  lon: number;
  geo_accuracy: number;
  // other props
  loading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
  redirect: string | null;
}

const defaultState: FbLoadMyNewPostState = {
  // form data
  title: '',
  content: '',
  tags: '',
  asset_id: null, // uuid
  asset_file: null, // uuid.jpg
  ...defaultLocationFormData,
  // other props
  loading: false,
  errorMessage: null,
  successMessage: null,
  redirect: null,
}

export class FbLoadMyNewPost extends Component<FbLoadMyNewPostProps, FbLoadMyNewPostState> {

  constructor(props) {
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
    const { title, content, tags, asset_id, lat, loading, geo } = this.state;
    try {
      const newPost = { title, content, tags, asset_id, lat, loading, geo };
      const { data = null, error = null } = await this.props.api.post_create(newPost);
      if (data) { // success
        this.setState({ successMessage: 'success', loading: false, redirect: makeMyPostsLink() });
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
