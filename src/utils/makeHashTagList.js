export function makeHashTagList(tags = '') {
  return tags.split(/[,|;]/g).map(w => w.trim());
}
