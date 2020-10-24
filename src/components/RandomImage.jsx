import React, { useState } from 'react';
import Link from 'next/link';
import { Image } from 'semantic-ui-react';
import { randomImgSrc } from '../lib/randomImgSrc';
import { placeHolderImgSrc } from '../lib/placeHolderImgSrc';

export function ImageLoader({ w = 320, h = 240, text = null, imgProps = {} }) {
  const imgStateLoading = 0;
  const imgStateLoaded = 1;
  const imgStateError = 2;
  const [imgState, setImgState] = useState(imgStateLoading);
  const srcTemp = placeHolderImgSrc({ w, h, text })
  
  const loaderImgProps = { ...imgProps, src: srcTemp };
  if (imgState === imgStateLoaded) return <Image {...imgProps} />;
  if (imgState === imgStateError) return <Image {...loaderImgProps} />;
  // default: loading
  return (
    <span>
      <img src={imgProps.src} style={{display:'none'}} 
        onLoad={() => setImgState(imgStateLoaded)} 
        onError={() => setImgState(imgStateError)}
      />
      <Image {...loaderImgProps} />
    </span>
  )
}

export function RandomImage({ keywords = '', w = 320, h = 240, link = null, ...overrides }) {
  console.log('RandomImage', keywords, w, h, link, overrides);
  const imgProps = {
    src: randomImgSrc(keywords, w, h),
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  //if (link) return <Link href={link}><ImageLoader imgProps={imgProps} w={w} h={h} /></Link>;
  return <ImageLoader imgProps={imgProps} w={w} h={h} />;
}
