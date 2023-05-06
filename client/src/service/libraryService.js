import axios from 'axios'
const currentUrl = 'http://localhost:3000';

export const getLocations = async () => {
    try {
      const res = await axios.get(`${currentUrl}/library`)
      return res.data
    } catch (err) {
      return { message : { msgBody : err }, msgError : true };
    }
};

export const deleteLocation = (id) => {
  axios.delete(`${currentUrl}/library`, { id: id })
    .then(() => {
      return { message : { msgBody : 'Location deleted' }, msgError : false};
    })
    .catch((err) => {
      return { message : { msgBody : err }, msgError : true };
    });
};

export const saveLocation = (location) => {
  console.log(location)
  axios.post(`${currentUrl}/search`, location)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => { 
      console.error(err)
  });
};