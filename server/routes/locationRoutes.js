const express = require('express');
const locationController = require('../controllers/locationController');

const router = express.Router();

router.post('/search', locationController.saveLocation);
router.get('/library', locationController.getLocations);
router.delete('/library', locationController.rmLocation);

module.exports = router;