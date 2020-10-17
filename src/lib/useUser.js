import { useEffect, useState } from 'react';

export function useUser(api, id) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.retrieveUser(id);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
