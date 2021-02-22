import { useEffect, useState } from 'react';

export function usePostSearchByTag(api, { tag = '', with_assets = false }) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);

  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.post_search({ tag });
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, [tag, with_assets]);

  return output;
}
