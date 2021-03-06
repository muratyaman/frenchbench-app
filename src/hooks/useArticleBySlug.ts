import { useEffect, useState } from 'react';
import { ApiClient } from '../utils';
import { md2Html } from '../utils/md2html';

export function useArticleBySlug(api: ApiClient, ssr, hydrating, slug, ssrData = {}) {
  const defaultOutput = { loading: true, data: null, error: null, ...ssrData };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const { data, error } = await api.article_retrieve({ slug });
      if (data && data.content) {
        try {
          data.content = await md2Html(data.content);
        } catch (err) {
          console.error('failed to convert markdown to html', err.message);
        }
      }
      setOutput({ data, error, loading: false });
    };
    if (!ssr) callApi();
  }, [ssr, hydrating, slug]);
  return output;
}
