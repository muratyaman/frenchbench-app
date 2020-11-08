import React from 'react';
import { ImageLoader } from './ImageLoader';
import { randomImg } from '../lib/randomImg';

export function RandomImage({ keywords = '', w = 320, h = 240, ...overrides }) {
  //const src = randomImgSrc(keywords, w, h);
  const { src, info } = randomImg(keywords, 'small');
  const imgProps = {
    src,
    alt: info,
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  return <ImageLoader imgProps={imgProps} w={w} h={h} off={src.includes('frenchbench')} />;
}
