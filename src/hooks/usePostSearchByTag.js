import { useEffect, useState } from 'react';

// input: { tag }
export function usePostSearchByTag(api, { tag = ''}) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.post_search({ tag });
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
