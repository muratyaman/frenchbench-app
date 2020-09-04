function RandomImage({ keywords = '' }) {
  const imgProps = {
    src: 'https://source.unsplash.com/random/400x300?' + keywords,
    alt: 'random image',
    width: '400',
  };
  return (
    <img {...imgProps} />
  );
}

export default RandomImage;
