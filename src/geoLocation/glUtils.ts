export const LOCATION_CHANGE_THRESHOLD = 10; // metres

export const EARTH_RADIUS = 6372.8; // in km

export interface FbSimpleCoords {
  latitude: number;
  longitude: number;
}

// @see https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
export const GL_defaultOptions = {
  enableHighAccuracy: true,
  timeout: 60 * 1000,
  maximumAge: 60 * 1000,
};

export const defaultLocationFormData = {
  lat: 0.0,
  lon: 0.0,
  geo_accuracy: 9999,
}

// @see https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
export interface FbGeoLocationCoords {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number; // expressed in meters
  altitudeAccuracy: number | null; // expressed in meters
  heading: number | null;
  speed: number | null; // in m/s
}

export interface FbGeoLocation {
  coords: FbGeoLocationCoords;
  timestamp: number;
}

// aliases for Math lib function names
const [pi, asin, sin, cos, sqrt, pow, round] = [
  'PI', 'asin', 'sin', 'cos', 'sqrt', 'pow', 'round',
].map(k => Math[k]);

export const deg2rad = (deg) => {
  return pi * deg / 180.0;
};

export const rad2deg = (rad) => {
  return 180.0 * rad / pi;
};

export interface GeoPoint {
  lat: number;
  lon: number;
}

export class GeoPos {
  pos: FbGeoLocation;
  constructor(pos: FbGeoLocation) {
    this.pos = pos;
  }

  lat() {
    return this.pos.coords.latitude;
  }

  lon() {
    return this.pos.coords.longitude;
  }

  getLatLon(): GeoPoint {
    const lat = this.lat();
    const lon = this.lon();
    return { lat, lon };
  }
}

/**
 * Haversine distance
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 * @see https://rosettacode.org/wiki/Haversine_formula#ES6
 */
export const haversine = (lat1, lon1, lat2, lon2) => {

  const [rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2]
    .map(x => deg2rad(x));

  const dLat = rlat2 - rlat1;
  const dLon = rlon2 - rlon1;

  return round(
    EARTH_RADIUS * 2.0 * asin(
      sqrt(
        pow(sin(dLat / 2.0), 2.0) +
        pow(sin(dLon / 2.0), 2.0) * cos(rlat1) * cos(rlat2)
      )
    ) * 1000.0
  ) / 1000.0;
};

export function geoDistance({ lat: lat1, lon: lon1 }: GeoPoint, { lat: lat2, lon: lon2 }: GeoPoint) {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0.0;
  }

  return round(haversine(lat1, lon1, lat2, lon2) * 1000.0);// km => m
}

/**
 * Earth distance in metres
 * @param geoPos1
 * @param geoPos2
 * @returns {number}
 */
export function geoDistanceByObjects(geoPos1: GeoPos, geoPos2: GeoPos) {
  const lat1 = Number(geoPos1.lat());
  const lon1 = Number(geoPos1.lon());
  const lat2 = Number(geoPos2.lat());
  const lon2 = Number(geoPos2.lon());

  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0.0;
  }

  return round(haversine(lat1, lon1, lat2, lon2) * 1000.0);// km => m
}

export function sortItemsByDistance(items) {
  return items.sort((p1, p2) => {
    if (p1.distance < p2.distance) { return -1; }
    if (p1.distance > p2.distance) { return 1; }
    return 0; // p1.distance === p2.distance
  });
}

export function addDistanceToItems(items, position: FbGeoLocation) {
  const pos = new GeoPos(position);
  return items.map(item => {
    const { lat, lon } = item;
    return { ...item, distance: geoDistance(pos.getLatLon(), {lat, lon}) };
  });
}

export const geoLondonEye: FbSimpleCoords  = { latitude: 51.5010499, longitude: -0.1216957 };
