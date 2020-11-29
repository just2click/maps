// default value of radiusInMeter is 1000 since 1 km equals 1000 meters.
const getRandomLocation = (currLocation, radiusInMeters = 1000) => {
    const values = Object.keys(currLocation)[0];
    if (values) {
        let lat = JSON.parse(values).lat;
        let lng = JSON.parse(values).lng;
    
        let getRandomCoordinates = (radius, uniform) => {
            let a = Math.random(), b = Math.random();
            if (uniform) {
                if (b < a) {
                    var c = b;
                    b = a;
                    a = c;
                }
            }
            return [
                b * radius * Math.cos(2 * Math.PI * a / b),
                b * radius * Math.sin(2 * Math.PI * a / b)
            ];
        };
    
        let randomCoordinates = getRandomCoordinates(radiusInMeters, true);
        let earth = 6378137;
        let northOffset = randomCoordinates[0], eastOffset = randomCoordinates[1];
        let offsetLatitude = northOffset / earth,
            offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (lat / 180)));
        return {
            lat: lat + (offsetLatitude * (180 / Math.PI)),
            lng: lng + (offsetLongitude * (180 / Math.PI))
        }
    }
};

const getDistanceBetweenPoints = (coordinate1, coordinate2) => {
    let dist = Math.sqrt( Math.pow((coordinate1.lat-coordinate2.lat), 2) +
                Math.pow((coordinate1.lng-coordinate2.lng), 2) );
    return dist * 100000;
}

module.exports = {
    getRandomLocation, getDistanceBetweenPoints
}