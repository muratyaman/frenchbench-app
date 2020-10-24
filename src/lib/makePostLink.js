export function makePostLink({ username, post_ref }) {
  return username && post_ref ? `/app/user/${username}/post/${post_ref}` : null;
}
