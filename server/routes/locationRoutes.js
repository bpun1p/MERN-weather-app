const express = require('express');
const { saveLocation, getLocations, deleteLocation } = require('../controllers/locationController');

const router = express.Router();

router.post('/search', saveLocation);
router.get('/library', getLocations);
router.delete('/library', deleteLocation);

module.exports = router;