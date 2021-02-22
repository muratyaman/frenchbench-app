import { useEffect, useState } from 'react';

export function useAdvertsOfUser(api, input) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.advert_search_by_user(input);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
