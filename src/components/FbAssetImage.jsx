import React from 'react';
import { ImageLoader } from './ImageLoader';
import { randomImg } from '../lib/randomImg';
import { assetImgSrc } from '../lib/assetImgSrc';

export function FbAssetImage({ asset = null, keywords = '', w = 320, h = 240, ...overrides }) {
  let src, alt;
  if (asset) {
    src = assetImgSrc(asset, 'small');
  } else {
    const img = randomImg(keywords, 'small');
    src = img.src;
    alt = img.info;
  }
  const imgProps = {
    src,
    alt,
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  return <ImageLoader imgProps={imgProps} w={w} h={h} />;
}
