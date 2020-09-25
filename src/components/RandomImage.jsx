import { Image } from 'semantic-ui-react';

export function RandomImage({ keywords = '' }) {
  const imgProps = {
    src: 'https://source.unsplash.com/random/400x300?' + keywords,
    alt: 'random image',
    width: '400',
  };
  //  <img {...imgProps} />
  return (
    <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
  );
}
