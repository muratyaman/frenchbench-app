import { useEffect, useState } from 'react';

export function usePostByUserAndRef(api, { username, post_ref }) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.post_retrieve_by_username_and_post_ref(username, post_ref);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}