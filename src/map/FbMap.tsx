import { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Icon } from 'semantic-ui-react';
import { FbMapCentreSvg } from './FbMapCentreSvg';
//import { FbMapPostInfo } from './FbMapPostInfo';
//import { FbMapAdvertInfo } from './FbMapAdvertInfo';
import { IMapViewportConfig, IMapFixedSettingsConfig } from '../appConfig';
import { AdvertSummaryModel, PostSummaryModel } from '../utils';
import { FbSimpleCoords } from '../geoLocation/glUtils';
import 'mapbox-gl/dist/mapbox-gl.css';

enum MapMarkerTypeEnum {
  POST   = 0,
  ADVERT = 1,
}

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
  minZoom: 14,
  maxZoom: 18,
  minPitch: 0,
  maxPitch: 0,
  pitch: 0, // 30, // [0 to 60]
  //bearing: 7, // view direction/heading
};

export interface FbMapProps {
  centre: FbSimpleCoords;
  bearing: number;
  posts?: PostSummaryModel[];
  adverts?: AdvertSummaryModel[];
  defaultViewport: IMapViewportConfig;
  fixedSettings: IMapFixedSettingsConfig;
}

export interface FbMapState {
  viewport: IMapViewportConfig;
  popupInfo: PostSummaryModel | AdvertSummaryModel;
  popupType: MapMarkerTypeEnum | null;
}

export class FbMap extends Component<FbMapProps, FbMapState> {
  constructor(props) {
    super(props);
    this.state = {
      viewport: props.defaultViewport,
      popupInfo: null,
      popupType: null,
    };
  }
  
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  onClickPostMarker = (ev, place) => {
    this.setState({ popupInfo: place, popupType: MapMarkerTypeEnum.POST });
  };

  onClickAdvertMarker = (ev, audio) => {
    this.setState({ popupInfo: audio, popupType: MapMarkerTypeEnum.ADVERT });
  };

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
        offsetLeft: -20,
        offsetTop: -10,
      };
      const hasWiki = true;// TODO: find out
      return (
        <Marker {...props}>
          <Icon
            onClick={ev => this.onClickPostMarker(ev, row)}
            name="sun"
            size="small"
            color={hasWiki ? 'blue' : 'grey'}
            className="ball-place"
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
        offsetLeft: -20,
        offsetTop: -10,
      };
      return (
        <Marker {...props}>
          <Icon
            onClick={ev => this.onClickAdvertMarker(ev, row)}
            name="play circle"
            size="small"
            color="blue"
            className="ball-audio"
          />
        </Marker>
      );
    });
  };
  
  onClosePopup = () => {
    this.setState({ popupInfo: null })
  };
  
  // _renderPopup() {
  //   const { popupInfo, popupType } = this.state;
  //   const contentDom = !popupInfo ? null : (
  //     popupType === MapMarkerTypeEnum.POST
  //     ? <FbMapPostInfo info={{ popupInfo as PostSummaryModel }} />
  //     : <FbMapAdvertInfo info={{ popupInfo as AdvertSummaryModel }} />
  //   );
  //   return (
  //     popupInfo && (
  //       <Popup
  //         tipSize={5}
  //         anchor='top'
  //         longitude={popupInfo.lon}
  //         latitude={popupInfo.lat}
  //         closeOnClick={false}
  //         onClose={this.onClosePopup}
  //       >
  //         {contentDom}
  //       </Popup>
  //     )
  //   );
  // }
  
  render() {
    let { viewport } = this.state;
    
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
          {this._renderPosts(posts)}
          {this._renderAdverts(adverts)}
          {/*this._renderPopup()*/}
        </ReactMapGL>
      </div>
    );
  }
}
