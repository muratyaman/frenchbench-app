import { useEffect, useState } from 'react';

// input: { user_id } or { username }
export function usePostsOfUser(api, input) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.post_search_by_user(input);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
