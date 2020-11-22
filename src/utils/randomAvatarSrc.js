// :sprites = male, female, human, identicon, initials, bottts, avataaars, jdenticon, gridy or code
// :seed can be anything you like
export const randomAvatarSrc = (username, sprites = 'human', mood = 'happy') => {
  return `https://avatars.dicebear.com/api/${sprites}/${username}.svg?mood[]=${mood}`;
}
