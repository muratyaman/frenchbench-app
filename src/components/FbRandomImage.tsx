import { FbImageLoader } from './FbImageLoader';
import { randomImg } from '../utils/randomImg';

export function FbRandomImage({ preferName = null, keywords = '', w = 320, h = 240, ...overrides }) {
  //const src = randomImgSrc(keywords, w, h);
  const { src, info } = randomImg(keywords, 'small', preferName);
  const imgProps = {
    src,
    alt: info,
    ui: false,
    label: { as: 'span', corner: 'left', icon: 'heart', color: 'purple' },
    wrapped: true,
    ...overrides,
  };
  return <FbImageLoader imgProps={imgProps} w={w} h={h} off={src.includes('frenchbench')} />;
}
