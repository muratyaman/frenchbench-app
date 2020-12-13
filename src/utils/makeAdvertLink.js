export function makeAdvertLink({ username, advert_ref }) {
  return username && advert_ref ? `/app/user/${username}/advert/${advert_ref}` : null;
}
