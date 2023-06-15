const express = require('express');
const { saveLocation, getLocations, deleteLocation } = require('../controllers/locationController');
const validateAuth = require('../middleware/validateAuth');

const router = express.Router(); 

router.use(validateAuth)  //validate token before allowing access to routes below

//save location
router.post('/search', saveLocation);

//get locations
router.get('/library', getLocations);

//delete locations
router.delete('/library', deleteLocation);

module.exports = router;