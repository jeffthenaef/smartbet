import axios from 'axios';

// eslint-disable-next-line
export const createRequest = async (method, url, data) => {
  let responseData;
  const headers = {};
  let params = {};

  if (method === 'get' && data) {
    params = { ...data };
  }

  await axios({
    method,
    url,
    headers,
    data,
    params,
  })
    .then((response) => {
      responseData = response;
    })
    .catch(async (error) => {
      responseData = (error.response && error.response.data.message) || error;
    });
  return responseData;
};
