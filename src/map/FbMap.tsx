import { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { Icon } from 'semantic-ui-react';
import { FbMapCentreSvg } from './FbMapCentreSvg';
import { FbMapPostInfo } from './FbMapPostInfo';
import { FbMapAdvertInfo } from './FbMapAdvertInfo';
import { IMapViewportConfig, IMapFixedSettingsConfig } from '../types';
import { AdvertSummaryModel, PostSummaryModel } from '../utils';
import { FbSimpleCoords } from '../geoLocation/glUtils';
import * as c from '../constants';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FbPropsWithApiAndI18n } from '../types';

/*
MAP properties {
  altitude: 1.5
  bearing: 0
  height: 350
  latitude: 51.5678
  longitude: 0.081919
  maxPitch: 60
  maxZoom: 24
  minPitch: 0
  minZoom: 0
  pitch: 0
  transitionDuration: 500
  transitionEasing: func...
  transitionInterpolator: e {propNames: Array(5), around: undefined}
  transitionInterruption: 1
  width: 1576
  zoom: 14
}
*/

const coreSettings = {
  dragPan: true,
  dragRotate: true,
  scrollZoom: true,
  touchZoom: true,
  touchRotate: true,
  keyboard: true,
  doubleClickZoom: true,
  minZoom: 11,
  maxZoom: 18,
  minPitch: 0,
  maxPitch: 0,
  pitch: 0, // 30, // [0 to 60]
  //bearing: 7, // view direction/heading
};

export interface FbMapProps extends FbPropsWithApiAndI18n {
  centre: FbSimpleCoords;
  bearing: number;
  posts?: PostSummaryModel[];
  adverts?: AdvertSummaryModel[];
  defaultViewport: IMapViewportConfig;
  fixedSettings: IMapFixedSettingsConfig;
}

export interface FbMapState {
  viewport: IMapViewportConfig;
  selectedPost: PostSummaryModel | null;
  selectedAdvert: AdvertSummaryModel | null;
}

export class FbMap extends Component<FbMapProps, FbMapState> {
  constructor(props) {
    super(props);
    this.state = {
      viewport: props.defaultViewport,
      selectedPost: null,
      selectedAdvert: null,
    };
  }
  
  _updateViewport = viewport => {
    this.setState({ viewport });
  }

  onClickPostMarker = (ev, selectedPost: PostSummaryModel) => {
    this.setState({ selectedPost, selectedAdvert: null });
  }

  onClickAdvertMarker = (ev, selectedAdvert: AdvertSummaryModel) => {
    this.setState({ selectedAdvert, selectedPost: null });
  }

  onClosePopup = () => {
    this.setState({ selectedAdvert: null, selectedPost: null });
  }

  _renderCentre = (centre) => {
    if (!centre) return null;

    const { latitude, longitude } = centre;
    const props = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      offsetLeft: -20,
      offsetTop: -10,
      style: {
        backgroundColor: 'white',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
      },
    };
    return (
      <Marker {...props}>
        {/* <Icon name="bullseye" size="small" color="red" className="centre-point" /> */}
        <FbMapCentreSvg />
      </Marker>
    );
  };

  _renderPosts = (rows) => {
    return !rows ? null : rows.map(row => {
      const props = {
        key: 'post-' + row.id,
        latitude: parseFloat(row.lat),
        longitude: parseFloat(row.lon),
        offsetLeft: 0,
        offsetTop: 0,
      };
      const hasWiki = true;// TODO: find out
      return (
        <Marker {...props}>
          <Icon
            onClick={ev => this.onClickPostMarker(ev, row)}
            name="sun"
            size="small"
            color={hasWiki ? 'blue' : 'grey'}
            className="map-marker-icon-post"
          />
        </Marker>
      );
    });
  };

  _renderAdverts = (rows) => {
    return !rows ? null : rows.map(row => {
      const props = {
        key: 'advert-' + row.id,
        latitude: parseFloat(row.lat),
        longitude: parseFloat(row.lon),
        offsetLeft: -10,
        offsetTop: -20,
      };
      return (
        <Marker {...props}>
          <Icon
            onClick={ev => this.onClickAdvertMarker(ev, row)}
            name={c.advertIcon}
            color={row.is_buying ? c.buyingColour : c.sellingColour}
            className="map-marker-icon-advert"
            size="large"
          />
        </Marker>
      );
    });
  };
  
  _renderPopup() {
    const { api, i18n } = this.props;
    const { selectedAdvert, selectedPost } = this.state;
    let contentDom = null, lat = 0, lon = 0;
    if (selectedAdvert) {
      contentDom = <FbMapAdvertInfo api={api} i18n={i18n} advert={selectedAdvert} />;
      lat = selectedAdvert.lat;
      lon = selectedAdvert.lon;
    }
    if (selectedPost) {
      contentDom = <FbMapPostInfo post={selectedPost} />;
      lat = selectedPost.lat;
      lon = selectedPost.lon;
    }
    return (
      contentDom && (
        <Popup
          tipSize={5}
          anchor='top'
          latitude={lat}
          longitude={lon}
          closeOnClick={false}
          onClose={this.onClosePopup}
        >
          {contentDom}
        </Popup>
      )
    );
  }
  
  render() {
    const { viewport } = this.state;
    
    const {
      centre,
      bearing,
      posts = [],
      adverts = [],
      fixedSettings,
    } = this.props;

    const override = {
      latitude: centre.latitude,
      longitude: centre.longitude,
      bearing: Math.round(bearing),
    };
    const mapProps = Object.assign(
      coreSettings,
      viewport,
      override,
      fixedSettings,
    );
    return (
      <div className='fb-map'>
        <ReactMapGL {...mapProps} onViewportChange={this._updateViewport}>
          {this._renderCentre(centre)}
          {this._renderAdverts(adverts)}
          {this._renderPosts(posts)}
          {this._renderPopup()}
        </ReactMapGL>
      </div>
    );
  }
}
