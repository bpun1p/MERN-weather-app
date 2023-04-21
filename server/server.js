const express = require('express');
const mongoose = require('mongoose');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://bpun1p:Test-1234@weatherdb.upjrnjk.mongodb.net/weatherDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));




