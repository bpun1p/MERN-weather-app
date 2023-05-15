import axios from 'axios';
const currentUrl = 'http://localhost:3000';

export const getLocations = async () => {
    try {
      const res = await axios.get(`${currentUrl}/library`);
      return res.data;
    } catch (err) {
      console.error(err);
    };
};

export const deleteLocation = async (id) => {
  try {
    const res = await axios.delete(`${currentUrl}/library`, {data: {data: id}});
    return res.status + ' Location Deleted';
  } catch (err) {
      console.error(err);
  };
}; 

export const saveLocation = async (location) => {
  try {
    const res = await axios.post(`${currentUrl}/search`, {location: location});
    console.log(res.status + ' Location Saved');
  } catch (err) {
      console.error(err);
  };
};