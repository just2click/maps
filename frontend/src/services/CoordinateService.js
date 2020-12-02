import HttpService from './HttpService.js'

const setRandomLocationByRadius = (currLocation) => {
  return HttpService.put(`coordinate/random-location`, currLocation);
}

const getDistBetween = (coordinates) => {
  return HttpService.post(`coordinate/distance-between-coordinates`, coordinates);
}

export default {
  setRandomLocationByRadius, getDistBetween
}