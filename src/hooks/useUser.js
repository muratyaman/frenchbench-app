import { useEffect, useState } from 'react';

// input = { id or username }
export function useUser(api, input) {
  const { id = null, username = null } = input;
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      let newOutput;
      if (id) {
        newOutput = await api.user_retrieve(id);
      } else if (username) {
        newOutput = await api.user_retrieve_by_username(username);
      } else {
        newOutput = { error: 'user id or username is required' };
      }
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, []);
  return output;
}
