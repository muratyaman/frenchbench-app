import { useEffect, useState } from 'react';

// input: { user_id } or { username }, { q }
export function useAdvertSearch(api, { q = '', min_price = -1, max_price = -1, lat = 0, lon = 0, limit = 10, with_assets = true } = {}) {
  const defaultOutput = { loading: true, data: [], error: null };
  const [output, setOutput] = useState(defaultOutput);
  
  useEffect(() => {
    const callApi = async () => {
      const newOutput = await api.advert_search({ q, min_price, max_price, lat, lon, limit, with_assets });
      setOutput({ ...newOutput, loading: false });
    };
    callApi();
  }, [q, min_price, max_price, lat, lon, limit, with_assets]);

  return output;
}
