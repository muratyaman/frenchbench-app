import { useEffect, useState } from 'react';

export function useArticleByIdToEdit(api, id) {
  const defaultOutput = { loading: true, data: null, error: null };
  const [output, setOutput] = useState(defaultOutput);
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.article_retrieve({}, id);
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, [id]);
  return output;
}
