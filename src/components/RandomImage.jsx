import React from 'react';
import { ImageLoader } from './ImageLoader';
import { randomImg } from '../lib/randomImg';

export function RandomImage({ keywords = '', w = 320, h = 240, ...overrides }) {
  //const src = randomImgSrc(keywords, w, h);
  const img = randomImg(keywords, 'small');
  const src = img.src;
  const imgProps = {
    src,
    alt: img.info,
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  return <ImageLoader imgProps={imgProps} w={w} h={h} />;
}
