const express = require('express');
const PORT = 3000;
const mongoose = require('mongoose');
const Location = require('./models/location');
const locationRoutes = require('./routes/locationRoutes');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://bpun1p:Test-1234@weatherdb.upjrnjk.mongodb.net/weatherDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`)))
  .catch((err) => console.log(err));
  
//Api routes  
app.use('/search', locationRoutes);
app.use('/library', locationRoutes);