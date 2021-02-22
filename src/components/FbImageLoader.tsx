import { FC, PropsWithChildren, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { placeHolderImgSrc } from '../utils/placeHolderImgSrc';
import { useMounted } from '../hooks/useMounted';

export interface FbImageLoaderProps {
  w?: number;
  h?: number;
  text?: string | null;
  imgProps?: {
    src?: string | null;
    alt?: string | null;
  };
  off?: boolean;
}

const hidden = { display: 'none' };

export const FbImageLoader: FC<FbImageLoaderProps> = (props: PropsWithChildren<FbImageLoaderProps>) => {
  const { w = 320, h = 240, text = null, imgProps, off = false } = props;
  const mounted = useMounted();
  const imgStateLoading = 0;
  const imgStateLoaded = 1;
  const imgStateError = 2;
  const [imgState, setImgState] = useState(off ? imgStateLoaded : imgStateLoading);
  const srcTemp = placeHolderImgSrc({ w, h, text })
  const loaderImgProps = { ...imgProps, src: srcTemp };
  const onLoad  = () => { setImgState(imgStateLoaded); }
  const onError = () => { console.log('img not loaded', imgProps.src); setImgState(imgStateError); }
  
  if (!mounted) return <img src={imgProps.src} alt={imgProps.alt} style={hidden} />

  // loaded
  if (imgState === imgStateLoaded) return <Image {...imgProps} />;
  
  // error
  if (imgState === imgStateError) return <Image {...loaderImgProps} />;
  
  // default: loading
  return (
    <>
      <img src={imgProps.src} alt={imgProps.alt} style={hidden} onLoad={onLoad} onError={onError} />
      <Image {...loaderImgProps} />
    </>
  );
}
