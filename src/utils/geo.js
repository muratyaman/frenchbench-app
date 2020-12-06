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

export class GeoPos {

  constructor(pos){
    this.pos = pos;
  }

  lat(){
    return this.pos.coords.latitude;
  }

  lon(){
    return this.pos.coords.longitude;
  }

  getLatLon(){
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
    .map(x => deg2rad(x)),

  dLat = rlat2 - rlat1,
  dLon = rlon2 - rlon1,
  radius = 6372.8; // Earth's radius in km

  return round(
    radius * 2.0 * asin(
      sqrt(
        pow(sin(dLat / 2.0), 2.0) +
        pow(sin(dLon / 2.0), 2.0) * cos(rlat1) * cos(rlat2)
      )
    ) * 1000.0
  ) / 1000.0;
};

export const geoDistance = ({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 }) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0.0;
  }

  return round(haversine(lat1, lon1, lat2, lon2) * 1000.0);// km => m
};

/**
 * Earth distance in metres
 * @param geoPos1
 * @param geoPos2
 * @returns {number}
 */
export const geoDistanceByObjects = (geoPos1, geoPos2) => {
  const lat1 = Number(geoPos1.lat());
  const lon1 = Number(geoPos1.lon());
  const lat2 = Number(geoPos2.lat());
  const lon2 = Number(geoPos2.lon());

  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0.0;
  }

  return round(haversine(lat1, lon1, lat2, lon2) * 1000.0);// km => m
};

export const geoLondonEye = { latitude: 51.5010499, longitude: -0.1216957 };
export const geoSevenKings = { latitude: 51.5664333, longitude: 0.0916753 };

export const sortItemsByDistance = (items) => {
  return items.sort((p1, p2) => {
    if (p1.distance < p2.distance) { return -1; }
    if (p1.distance > p2.distance) { return 1; }
    return 0; // p1.distance === p2.distance
  });
};

export const sortPlacesByDistance = (places, position) => {
  const pos = new GeoPos(position);
  const itemsWithDistance = places.map(place => {
    const { lat, lon } = place;
    return { place, distance: geoDistance(pos.getLatLon(), {lat, lon}) };
  });
  return sortItemsByDistance(itemsWithDistance);
};

export const sortAudiosByDistance = (audios, position) => {
  const pos = new GeoPos(position);
  const itemsWithDistance = audios.map(audio => {
    const { lat, lon } = audio;
    return { audio, distance: geoDistance(pos.getLatLon(), {lat, lon}) };
  });
  return sortItemsByDistance(itemsWithDistance);
};
