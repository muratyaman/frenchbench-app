import { Image } from 'semantic-ui-react';

export const randomImgSrc = (keywords = '') => {
  return 'https://source.unsplash.com/random/400x300?' + keywords;
}

export function RandomImage({ keywords = '' }) {
  const imgProps = {
    src: randomImgSrc(keywords),
    //alt: 'random image',
    //width: '400',
    ui: false
  };
  //  <img {...imgProps} />
  return (
    <Image wrapped {...imgProps} />
  );
}
