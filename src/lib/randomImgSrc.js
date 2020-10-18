export const randomImgSrc = (keywords = '', w = 400, h = 300) => {
  return `https://source.unsplash.com/random/${w}x${h}?${keywords}`;
}
