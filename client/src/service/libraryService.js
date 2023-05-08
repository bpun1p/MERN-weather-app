import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
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
  axios.post(`${currentUrl}/search`, {
    id: uuidv4(),
    location: location
  })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => { 
      console.error(err)
  });
};