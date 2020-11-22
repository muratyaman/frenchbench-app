export function placeHolderImgSrc({ w = 320, h = 240, text = null }) {
  return `https://via.placeholder.com/${w}x${h}` + (text ? `?text=${text}` : '');
}
