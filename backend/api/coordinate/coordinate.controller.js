const { getRandomLocation, getDistanceBetweenPoints } = require('../coordinate/coordinate.service');

const setRandomLocationByRadius = async (req, res)  => {
    try {
        const currLocation = await req.body;
        res.send(getRandomLocation(currLocation));
    }
    catch(e) {
        console.error(e);
    }
}

const getDistanceBetweenCoordinates = async (req, res) => {
    const coordinates = req.body; // includes ball coordinate object & goal coordinate object.
    const coordinatesKeys = Object.keys(coordinates)[0];
    const ballCoords = JSON.parse(coordinatesKeys).ballPos;
    const goalCoords = JSON.parse(coordinatesKeys).goalPos;
    if (goalCoords !== undefined && goalCoords.lat !== undefined) {
        try {
            const dist = await getDistanceBetweenPoints(ballCoords, goalCoords);
            res.send({dist});
        }
        catch(e){
            console.error(e);
        }
    }
}

module.exports = {
    setRandomLocationByRadius, getDistanceBetweenCoordinates
}