const express = require('express');
const { setRandomLocationByRadius, getDistanceBetweenCoordinates } = require('./coordinate.controller');
const router = express.Router();

router.put('/:random-location', setRandomLocationByRadius);
router.post('/:distance-between-coordinates', getDistanceBetweenCoordinates);

module.exports = router;