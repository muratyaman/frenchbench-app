import { useEffect, useState } from 'react';

export function useUser(api, username) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      let newOutput;
      // newOutput = { error: 'user id or username is required' };
      // newOutput = await api.user_retrieve(id);
      newOutput = await api.user_retrieve_by_username(username);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, [ username ]);
  return output;
}
