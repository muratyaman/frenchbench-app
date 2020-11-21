import { useEffect, useState } from 'react';

export function useArticleBySlug(api, ssr, hydrating, slug, ssrData = {}) {
  const defaultOutput = { loading: true, data: null, error: null, ...ssrData };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.article_retrieve({ slug });
      setOutput({ ...newOutput, loading: false });
    };
    if (!ssr) callApi();
  }, [ssr, hydrating, slug]);
  return output;
}
