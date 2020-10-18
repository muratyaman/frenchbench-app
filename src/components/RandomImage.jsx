import React from 'react';
import { Image } from 'semantic-ui-react';

export const randomImgSrc = (keywords = '', w = 400, h = 300) => {
  return `https://source.unsplash.com/random/${w}x${h}?${keywords}`;
}

export function RandomImage({ keywords = '', w = 400, h = 300, ...overrides }) {
  const imgProps = {
    src: randomImgSrc(keywords, w, h),
    //alt: 'random image',
    //width: '400',
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  //  <img {...imgProps} />
  return (
    <Image {...imgProps} />
  );
}
