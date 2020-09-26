export const newServerConfig = () => {
  const penv = process && process.env ? process.env : {};
  return {
    api: {
      baseURL: (penv.API_BASE_URL || 'http://127.0.0.1:12000/api'),
      timeout: 30 * 1000,
    },
  };
};

export const content = {
  home: {
    title: 'FrenchBench community',
    summary: `keep learning.
keep sharing your time/knowledge/conversation/things.
keep helping others/beings/planet.`,
    keywords: 'community',
  },
  terms: {
    title: 'Terms of Service',
    summary: 'Quisque suscipit, massa sed bibendum volutpat, lacus urna congue justo, pharetra convallis diam nisi cursus mauris. Proin nec suscipit risus, in convallis orci. Phasellus ullamcorper enim ac commodo condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas volutpat tortor in diam vestibulum suscipit. Ut pretium mollis libero at euismod. Phasellus congue cursus nisl, at condimentum lorem ullamcorper vel. Sed lacus nisl, semper et placerat vitae, tincidunt non mauris. Mauris quis quam fermentum, dignissim lacus a, mattis lorem. Aliquam tincidunt est quis eros ultricies, ac ornare ligula aliquam. Mauris nec accumsan velit.',
    keywords: 'legal',
  },
  privacy: {
    title: 'Privacy Policy',
    summary: 'Pellentesque iaculis diam sit amet ornare molestie. Quisque nec nulla sed massa pretium tristique eu eget massa. Nulla et sem placerat, tempus turpis fermentum, efficitur nisl. Cras eu ligula orci. Suspendisse metus est, commodo congue neque quis, placerat sodales lorem. Cras pharetra id risus vitae vulputate. Sed vehicula mattis odio, a lacinia tortor tempus sit amet. Nulla quis tincidunt ligula. Aliquam posuere bibendum dui laoreet pharetra. Donec ut tellus ipsum.',
    keywords: 'privacy',
  },
  about: {
    title: 'About Us',
    summary: 'info about FrenchBench here',
    keywords: 'information',
  },
  contact: {
    title: 'Contact Us',
    summary: 'contact info here',
    keywords: 'information',
  },
};

