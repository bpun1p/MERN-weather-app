const Location = require('../models/location');

const saveLocation = (req, res) => {
  console.log(req.body)
  const location = new Location(req.body);
  location.save()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
};

const getLocations = (req, res) => {
  Location.find().sort({ createdAt: -1 })
    .then((results) => res.send(results))
    .catch((err) => res.send(err));
};

const rmLocation = (req, res) => {
  const id = req.params.id
  Blog.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.send(err));
};

module.exports = {
  saveLocation,
  getLocations,
  rmLocation
};