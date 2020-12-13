import { useEffect, useState } from 'react';

// input: { user_id } or { username }, { q }
export function useAdvertSearch(api, input) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.advert_search(input);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
