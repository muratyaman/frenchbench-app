// see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
import { Component, createContext } from 'react';
import * as glUtils from './glUtils';

export interface FbGeoLocationContextType {
  error?: string | null;
  location?: glUtils.FbGeoLocation | null;
  startWatching: () => void,
  stopWatching: () => void,
  supported: boolean;
}

export const GL_defaultContext: FbGeoLocationContextType = {
  error: null,
  location: null,
  startWatching: () => {},
  stopWatching: () => {},
  supported: false,
};

export const FbGeoLocationContext = createContext<FbGeoLocationContextType>(GL_defaultContext);

export const FbGeoLocationContextConsumer = FbGeoLocationContext.Consumer; // alias

export interface FbGeoLocationContextProviderProps {
  options?: {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
  }
}

export class FbGeoLocationContextProvider extends Component<FbGeoLocationContextProviderProps, FbGeoLocationContextType> {

  unmounting = false;
  watchId = 0;
  geo = null;

  constructor(props) {
    super(props);
    this.resetGeo();
    this.unmounting = false;
    this.watchId = null;
    this.state = {
      ...GL_defaultContext,
      startWatching: this.startWatching,
      stopWatching: this.stopWatching,
      error: this.geo ? null : 'geolocation not supported',
      supported: !! this.geo,
    };
  }

  resetGeo = () => {
    this.geo = navigator.geolocation || null; // localize
    return this.geo;
  }

  startWatching = () => {
    if (this.geo) {
      const { options = glUtils.GL_defaultOptions } = this.props;
      try {
        this.watchId = this.geo.watchPosition(this.onLocation, this.onError, options);
      } catch (err) {
        this.setState({ error: err.message });
      }
    }
  }

  stopWatching = () => {
    if (this.geo && this.watchId) {
      try {
        this.geo.clearWatch(this.watchId);
      } catch (err) {
        if (!this.unmounting) {
          this.setState({ error: err.message });
        }
      }
    }
  }

  // @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  onLocation = (location) => {
    const oldLocation = this.state.location;

    if (oldLocation) {// not first time
      const pos1 = new glUtils.GeoPos(oldLocation);
      const pos2 = new glUtils.GeoPos(location);
      const distance = glUtils.geoDistance(pos1.getLatLon(), pos2.getLatLon());
      if (glUtils.LOCATION_CHANGE_THRESHOLD < distance) {
        console.log('FbGeoLocationContextProvider.onLocation enough distance change', distance);
        this.setState({ location });
      }
    } else { // first time
      this.setState({ location });
    }
  }

  // @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
  onError = (err) => {
    console.log('FbGeoLocationContextProvider.onError', err);
    this.setState({ error: err.message });
  }

  componentDidMount() {
    this.resetGeo();
    if (window) { // client-side only
      this.startWatching();
    }
  }

  componentWillUnmount() {
    this.unmounting = true;
    this.stopWatching();
  }

  render() {
    return (
      <FbGeoLocationContext.Provider value={this.state}>
        {this.props.children}
      </FbGeoLocationContext.Provider>
    );
  }
}
