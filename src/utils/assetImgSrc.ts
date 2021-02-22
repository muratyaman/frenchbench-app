/**
 * make asset image source
 * @param {*} asset with url 'uuid.jpg'
 * @param {*} size small, medium, large
 */
export function assetImgSrc(asset, size = 'small' ) {
  // TODO use env setting
  return `https://frenchbench.s3.eu-west-2.amazonaws.com/uploads/images/${size}/${asset.url}`;
}
