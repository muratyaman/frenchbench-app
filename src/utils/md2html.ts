import remark from 'remark';
import remarkHtml from 'remark-html';

export async function md2Html(mdText) {
  const result = await remark().use(remarkHtml).process(mdText);
  return result.toString();
}
