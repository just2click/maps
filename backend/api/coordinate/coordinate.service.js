// default value of radiusInMeter is 1000 since 1 km equals 1000 meters.
// took calculation from here: https://stackoverflow.com/questions/25350807/how-to-generate-random-lat-lng-values-with-known-center-and-radius-in-javascript

// generate a fairly uniform random point within a triangle and convert that to a point within
// the circle of a radius.
// Then we convert that point to offset coordinates and add them to the original.

const getRandomLocation = (currLocation, radiusInMeters = 1000) => {
    let lat = currLocation.lat;
    let lng = currLocation.lng;
    
    let getRandomCoordinates = (radius, uniform) => {
        let a = Math.random(), b = Math.random();

        if (uniform) {
            if (b < a) {
                let c = b;
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
    // Earths radius in meters via WGS 84 model.
    let earth = 6378137;
    // Offsets in meters.
    let northOffset = randomCoordinates[0], eastOffset = randomCoordinates[1];
    let offsetLatitude = northOffset / earth,
    offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (lat / 180)));
    // Offset position in decimal degrees.
    return {
        lat: lat + (offsetLatitude * (180 / Math.PI)),
        lng: lng + (offsetLongitude * (180 / Math.PI))
     }
};

const getDistanceBetweenPoints = (coordinate1, coordinate2) => {
    console.log(coordinate1);
    let dist = Math.sqrt( Math.pow((coordinate1.lat-coordinate2.lat), 2) +
                Math.pow((coordinate1.lng-coordinate2.lng), 2) );
    // convert from degress     
    return dist * 111000;
}

module.exports = {
    getRandomLocation, getDistanceBetweenPoints
}