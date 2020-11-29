// see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
import React from 'react';

export const defaultContext = {
  lastError: null,
  lastPosition: null,
  positions: [],
  startWatching: () => {},
  stopWatching: () => {},
};

// @see https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
export const defaultOptions = {
  enableHighAccuracy: true,
  timeout: 15 * 1000, // Is a positive long value representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. The default value is Infinity, meaning that getCurrentPosition() won't return until the position is available.
  maximumAge: 60 * 1000, // Is a positive long value indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device must return a cached position regardless of its age. Default: 0.
};

export const GeoLocationContext = React.createContext(defaultContext);

export class GeoLocationContextProvider extends React.Component {

  constructor(props) {
    console.log('GeoLocationContextProvider.constructor', props);
    super(props);
    this.geo = navigator.geolocation || null; // localize
    this.unmounting = false;
    this.watchId = null;
    this.state = {
      ...defaultContext,
      startWatching: this.startWatching,
      stopWatching: this.stopWatching,
      lastError: this.geo ? null : 'geolocation not supported',
    };
  }

  startWatching = (ev) => {
    console.log('GeoLocationContextProvider.startWatching', ev);
    if (this.geo) {
      const { options = defaultOptions } = this.props;
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
          this.setState({ lastError: err.message });
        }
      }
    }
  }

  // @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  onLocation = (lastPosition) => {
    console.log('GeoLocationContextProvider.onLocation', lastPosition);
    this.setState({ lastPosition });
  }

  // @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
  onError = (err) => {
    console.log('GeoLocationContextProvider.onError', err);
    this.setState({ lastError: err.message });
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
