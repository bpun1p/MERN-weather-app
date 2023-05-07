const express = require('express');
const PORT = 3000;
const mongoose = require('mongoose');
const locationRoutes = require('./routes/locationRoutes');

//express app
const app = express();

//middleweare to read body, parse it and place results in req.bdoy
app.use(express.urlencoded({extended: true}));       // for application/x-www-form-urlencoded
app.use(express.json());             // for application/json

//middleware to enable requests between multiple browsers 
const cors = require('cors')
app.use(cors())

//connect to mongodb
const dbURI = 'mongodb+srv://bpun1p:Test-1234@weatherdb.upjrnjk.mongodb.net/weatherDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`)))
  .catch((err) => console.log(err));

//Api routes  
app.use('/', locationRoutes); 