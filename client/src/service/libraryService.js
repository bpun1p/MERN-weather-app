import axios from 'axios'
const currentUrl = window.location.href;

export const getLocations = () => {
  axios.get(`${currentUrl}/library`)
    .then((res) => {res.json().then((data) => data)})
    .catch(err => console.error(err));
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
  axios.post(`${currentUrl}/search`, location)
    .then(() => {
      return { message : { msgBody : 'Location saved' }, msgError : false};
    })
    .catch((err) => { 
      return { message : { msgBody : err }, msgError : true };
  });
};