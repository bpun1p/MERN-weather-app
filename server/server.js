const express = require('express');
const mongoose = require('mongoose');
const Location = require('./models/location');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://bpun1p:Test-1234@weatherdb.upjrnjk.mongodb.net/weatherDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('/add-location', (req, res) => {
  const location = new Location({
    location: 'Vancouver'
  });
  location.save()
    .then((result) => {res.send(result)})
    .catch((err) => {console.log(err)});
})

app.get('/all-locations', (req, res) => {
  Location.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
})
