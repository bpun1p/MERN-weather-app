import axios from 'axios';
const currentUrl = 'http://localhost:3000';


export const getLocations = async (user) => {
    try {
      const res = await axios.get(`${currentUrl}/library`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      return res.data;
    } catch (err) {
      console.error(err);
    };
};

export const deleteLocation = async (id, user) => {
  try {
    const res = await axios.delete(`${currentUrl}/library`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      data: {data: id},   
    });
    return res.status + ' Location Deleted';
  } catch (err) {
      console.error(err);
  };
}; 

export const saveLocation = async (location, user) => {
  try {
    const res = await axios.post(`${currentUrl}/dashboard`,{ 
      location: location 
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      },
    });
    console.log(res.status + ' Location Saved');
  } catch (err) {
      console.error(err);
  };
};