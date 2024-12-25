import axios from 'axios';

export const axiosResponse = async (requestURL: string) => {
  const data = await axios(requestURL)
    .then((res) => {
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return `<p>${error.message}</p>`;
    });
  return data;
};