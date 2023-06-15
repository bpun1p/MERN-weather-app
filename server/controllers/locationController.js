const Location = require('../models/locationModel');

const saveLocation = async (req, res) => {
  try {
    const user_id = req.user._id

    const location = new Location({
      location: req.body.location, 
      user_id: user_id
    });
    
    const saved = await location.save();
    res.status(200).json({ msg : `saved location ${saved.location}`});
  }
  catch(err) {
    res.status(400).json({ msg: err });
  };
};

const getLocations = async (req, res) => {
  try {
    const user_id = req.user._id

    locations = await Location.find({ user_id }).sort({ createdAt: -1 });
    res.send(locations);
  } 
  catch(err) {
    res.status(400).json({ msg: err });
  };
};

const deleteLocation = async (req, res) => {
  const id = req.body.data
  try {
    const deleted = await Location.findByIdAndDelete(id);
    res.status(200).json(deleted);
  }
  catch(err) {
    res.status(400).json({ msg: err });
  };
};

module.exports = {
  saveLocation,
  getLocations,
  deleteLocation
};