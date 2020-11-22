import { randomImgSrc } from './randomImgSrc';

export const images = [
  {
    name: "001.jpg",
    artist: "Catherine Cordasco",
    info: "Balcony Concerts. I would like through this illustration to show solidarity, generosity, creativity between people even with social distancing. We are all together and we are all support and take care of everyone ! Image created by Catherine Cordasco. Submitted for United Nations Global Call Out To Creatives - help stop the spread of COVID-19.",
    ref_url: "https://unsplash.com/photos/gMPsl1ez-Ts",
    keywords: [ "community" ],
  },
  {
    name: "002.jpg",
    artist: "Ian Schneider",
    info: "Seattle, USA",
    ref_url: "https://unsplash.com/photos/TamMbr4okv4",
    keywords: [ "community" ],
  },
  {
    name: "003.jpg",
    artist: "Vonecia Carswell",
    info: "I took this photograph of a group of ladies at a photo walk in NYC. It perfectly exemplified the unity that took place among photographers, models and creatives alike. Shout out to International Women's Day.",
    ref_url: "https://unsplash.com/photos/TamMbr4okv4",
    keywords: [ "community" ],
  },
  {
    name: "004.jpg",
    artist: "Aaron Burden",
    info: "Welcome chalkboard sign",
    ref_url: "https://unsplash.com/photos/AvqpdLRjABs",
    keywords: [ "welcome" ],
  },
  {
    name: "005.jpg",
    artist: "Nick Fewings",
    info: "Bournemouth Beach, Bournemouth, UK",
    ref_url: "https://unsplash.com/photos/XqOBKnxDSfE",
    keywords: [ "welcome" ],
  },
  {
    name: "006.jpg",
    artist: "Tienko Dima",
    info: "Bali, Indonesia",
    ref_url: "https://unsplash.com/photos/_3ClM_FeQXk",
    keywords: [ "welcome" ],
  },
  {
    name: "007.jpg",
    artist: "Chrissie Kremer",
    info: "Half Moon Bay, USA",
    ref_url: "https://unsplash.com/photos/Eq9uX_TuE_c",
    keywords: [ "trade" ],
  },
  {
    name: "008.jpg",
    artist: "Egor Myznik",
    info: "Saint Petersburg, Russia",
    ref_url: "https://unsplash.com/photos/wIQxaR-WeQc",
    keywords: [ "trade" ],
  },
  {
    name: "009.jpg",
    artist: "Sasha Freemind",
    info: "Never give up. It is during our darkest moments that we must focus to see the light. And it will light the way..",
    ref_url: "https://unsplash.com/photos/Pv5WeEyxMWU",
    keywords: [ "loneliness" ],
  },
];

export function randomImg(keywords = '', size = 'small', preferName = null) {
  let filtered = [], lookup = [];
  if (preferName) {
    filtered = images.filter(img => img.name === preferName);
  } else {
    lookup = keywords.split(',').map(kw => kw.trim()).filter(kw => kw !== '');
    if (lookup.length) {
      filtered = images.filter(img => img.keywords.filter(kw => lookup.includes(kw)).length > 0);
    }
  }
  let newImg = null;
  if (filtered.length === 0) {
    const src = randomImgSrc(keywords, 320, 240);
    newImg = {
      name: '999',
      info: 'n/a',
      artist: 'n/a',
      ref_url: src,
      keywords: lookup,
      src,
    };
  } else {
    const idx = filtered.length === 1 ? 0 : Math.round(Math.random(filtered.length - 1));
    const img = filtered[idx];
    newImg = {
      ...img,
      src: process.env.REACT_APP_CDN + '/images/' + size + '/' + img.name,
    };
  }
  return newImg;
}
