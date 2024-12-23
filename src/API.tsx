export const fetchItems = async (requestURL: string) => {
  const data = await fetch(requestURL).then((res) => res.json());
  // console.log(data);
  return data;
};
