import { useEffect, useState } from 'react';

export function useCurrentUser(api) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.me();
      setOutput({...newOutput, loading: false });
    }
    callApi();
  }, []);
  return output;
}
