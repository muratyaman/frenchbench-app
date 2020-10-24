export function makeHashTagList(tags = '') {
  return tags.replace(/,/g, ';').split(';').map(w => w.trim());
}
