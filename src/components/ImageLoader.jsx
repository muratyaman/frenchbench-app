import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { placeHolderImgSrc } from '../lib/placeHolderImgSrc';

export function ImageLoader({ w = 320, h = 240, text = null, imgProps = {} }) {
  const imgStateLoading = 0;
  const imgStateLoaded = 1;
  const imgStateError = 2;
  const [imgState, setImgState] = useState(imgStateLoading);
  const srcTemp = placeHolderImgSrc({ w, h, text })
  const loaderImgProps = { ...imgProps, src: srcTemp };
  const onLoad = () => {
    console.log('ImageLoader onLoad', imgProps.src);
    setImgState(imgStateLoaded);
  }
  const onError = () => {
    console.warn('ImageLoader onError', imgProps.src);
    setImgState(imgStateError);
  }
  if (imgState === imgStateLoaded) return <Image {...imgProps} />;
  if (imgState === imgStateError) return <Image {...loaderImgProps} />;
  // default: loading
  return (
    <>
      <img src={imgProps.src} style={{display:'none'}} 
        onLoad={onLoad} 
        onError={onError}
      />
      <Image {...loaderImgProps} />
    </>
  )
}
