import { useEffect, useState } from 'react';

export function usePostsOfUser(api, user_id, with_assets = false) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.post_search({ user_id, with_assets });
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
