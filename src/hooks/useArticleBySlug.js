import { useEffect, useState } from 'react';
import { md2Html } from '../lib/md2html';

export function useArticleBySlug(api, ssr, hydrating, slug, ssrData = {}) {
  const defaultOutput = { loading: true, data: null, error: null, ...ssrData };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.article_retrieve({ slug });
      if (newOutput && newOutput.data && newOutput.data.content) {
        try {
          newOutput.data.content = await md2Html(newOutput.data.content);
        } catch (err) {
          console.error('failed to convert markdown to html', err.message);
        }
      }
      setOutput({ ...newOutput, loading: false });
    };
    if (!ssr) callApi();
  }, [ssr, hydrating, slug]);
  return output;
}
