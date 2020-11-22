export function makeArticleLink({ slug }) {
  return slug ? `/info/article/${slug}` : null;
}
