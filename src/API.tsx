export const fetchItems = async (requestURL: string) => {
  const data = await fetch(requestURL).then((res) => res.json());
  return data;
};
