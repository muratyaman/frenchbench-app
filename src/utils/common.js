import fetch from 'isomorphic-unfetch';

export async function fetcher(...args) {
  const res = await fetch(...args);
  return res.json();
}
