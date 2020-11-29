import HttpService from './HttpService.js'

const setRandomLocationByRadius = (currLocation) => {
    return HttpService.put(`coordinate/random-location`, JSON.stringify(currLocation));
}

const getDistBetween = (coordinates) => {
  return HttpService.post(`coordinate/distance-between-coordinates`, JSON.stringify(coordinates));
}

export default {
  setRandomLocationByRadius, getDistBetween
}