import { useEffect, useState } from 'react';

export function useAdvertByUserAndRef(api, input) {
  const { username, slug, with_assets = false } = input;
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.advert_retrieve_by_username_and_slug({ username, slug, with_assets });
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
