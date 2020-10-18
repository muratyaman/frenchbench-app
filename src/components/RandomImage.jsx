import React from 'react';
import { Image } from 'semantic-ui-react';
import { randomImgSrc } from '../lib/randomImgSrc';

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
