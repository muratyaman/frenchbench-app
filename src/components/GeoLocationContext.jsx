// see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
import React from 'react';
import { geoDistance, GeoPos } from '../utils/geo';

export const LOCATION_CHANGE_THRESHOLD = 10; // metres

export const GL_defaultContext = {
  error: null,
  location: null,
  startWatching: () => {},
  stopWatching: () => {},
};

// @see https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
export const GL_defaultOptions = {
  enableHighAccuracy: true,
  timeout: 60 * 1000,
  maximumAge: 60 * 1000,
};

export const GeoLocationContext = React.createContext(GL_defaultContext);

export class GeoLocationContextProvider extends React.Component {

  constructor(props) {
    console.log('GeoLocationContextProvider.constructor', props);
    super(props);
    this.geo = navigator.geolocation || null; // localize
    this.unmounting = false;
    this.watchId = null;
    this.state = {
      ...GL_defaultContext,
      startWatching: this.startWatching,
      stopWatching: this.stopWatching,
      error: this.geo ? null : 'geolocation not supported',
    };
  }

  startWatching = (ev) => {
    console.log('GeoLocationContextProvider.startWatching', ev);
    if (this.geo) {
      const { options = GL_defaultOptions } = this.props;
      try {
        this.watchId = this.geo.watchPosition(this.onLocation, this.onError, options);
      } catch (err) {
        this.setState({ lastError: err.message });
      }
    }
  }

  stopWatching = (ev) => {
    console.log('GeoLocationContextProvider.stopWatching', ev);
    if (this.geo && this.watchId) {
      try {
        this.geo.clearWatch(watchId);
      } catch (err) {
        if (!this.unmounting) {
          this.setState({ error: err.message });
        }
      }
    }
  }

  // @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  onLocation = (location) => {
    console.log('GeoLocationContextProvider.onLocation', location);
    const oldLocation = this.state.location;

    if (oldLocation) {// not first time
      const pos1 = new GeoPos(oldLocation);
      const pos2 = new GeoPos(location);
      const distance = geoDistance(pos1.getLatLon(), pos2.getLatLon());
      if (LOCATION_CHANGE_THRESHOLD < distance) {
        this.setState({ location });
      }
    } else { // first time
      this.setState({ location });
    }
  }

  // @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
  onError = (err) => {
    console.log('GeoLocationContextProvider.onError', err);
    this.setState({ error: err.message });
  }

  componentDidMount() {
    console.log('GeoLocationContextProvider.componentDidMount');
    this.startWatching();
  }

  componentWillUnmount() {
    this.unmounting = true;
    this.stopWatching();
  }

  render() {
    return (
      <GeoLocationContext.Provider value={this.state}>
        {this.props.children}
      </GeoLocationContext.Provider>
    );
  }
}
