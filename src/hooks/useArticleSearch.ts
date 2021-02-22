import { useEffect, useState } from 'react';

export function useArticleSearch(api, input) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.article_search(input);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
