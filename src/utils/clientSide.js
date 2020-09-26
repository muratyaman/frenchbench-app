export const newClientConfig = () => {
  const penv = process && process.env ? process.env : {};
  return {
    api: {
      baseURL: penv.NEXT_PUBLIC_API_BASE_URL || '/api',
      timeout: 30,
    },
  };
};
