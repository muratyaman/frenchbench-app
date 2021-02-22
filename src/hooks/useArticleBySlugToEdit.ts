import { useEffect, useState } from 'react';

export function useArticleBySlugToEdit(api, slug) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.article_retrieve({ slug });
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, [slug]);
  return output;
}
