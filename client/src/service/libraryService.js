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
  axios.delete(`${currentUrl}/library`, { data : { data : id }})
    .then((res) => {
      console.log(res.status + ' Location Deleted')    
    })
    .catch((err) => {
      console.error(err)
    });
}; 

export const saveLocation = (location) => {
  axios.post(`${currentUrl}/search`, {location: location})
    .then((res) => {
      console.log(res.status + ' Location Saved')
    })
    .catch((err) => { 
      console.error(err)
  });
};