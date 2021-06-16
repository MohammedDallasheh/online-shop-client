import axios from 'axios';

export const getLangingData = async () => {
  const { data } = await axios.get(`api/display/landingpage`);
  return data;
};
