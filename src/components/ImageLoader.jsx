import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';
import { placeHolderImgSrc } from '../lib/placeHolderImgSrc';
import { useMounted } from '../lib/useMounted';

export function ImageLoader({ w = 320, h = 240, text = null, imgProps = {}, off = false }) {
  const mounted = useMounted();
  const imgStateLoading = 0;
  const imgStateLoaded = 1;
  const imgStateError = 2;
  const [imgState, setImgState] = useState(off ? imgStateLoaded : imgStateLoading);
  const srcTemp = placeHolderImgSrc({ w, h, text })
  const loaderImgProps = { ...imgProps, src: srcTemp };
  const onLoad  = () => { console.log('img loaded',     imgProps.src); setImgState(imgStateLoaded); }
  const onError = () => { console.log('img not loaded', imgProps.src); setImgState(imgStateError); }
  
  if (!mounted) return <img src={imgProps.src} style={{display:'none'}} />

  // loaded
  if (imgState === imgStateLoaded) return <Image {...imgProps} />;
  
  // error
  if (imgState === imgStateError) return <Image {...loaderImgProps} />;
  
  // default: loading
  return (
    <>
      <img src={imgProps.src} style={{display:'none'}} onLoad={onLoad} onError={onError} />
      <Image {...loaderImgProps} />
    </>
  )
}
