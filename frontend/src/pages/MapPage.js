import React from 'react';
import { useGoogleMaps } from 'react-hook-google-maps';
import coordinateService from '../services/CoordinateService';
import swal from 'sweetalert';

  let localGoogle, localMap = null;
  let goalFlag, isBallMoved, isGameOver = false;
  let lastBall, firstBall; // to initilaize ball and delete when ball is moved. 
  let interval = {};

  const icons = {
    ball: 'https://res.cloudinary.com/dtwqtpteb/image/upload/v1606671653/uzqbmjigztvxmpsnvcqc.png',
    goal: 'https://res.cloudinary.com/dtwqtpteb/image/upload/v1606671859/f7corbmxuiucuaeu98uf.png'
  }

  const setsetUserPosition = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(pos);
        })
      }
    });
  }
  
  const drawIcon = (data) => {
  const icon = {
    url: data.icon,
    size: new localGoogle.maps.Size(70, 70),
    origin: new localGoogle.maps.Point(0, 0),
    anchor: new localGoogle.maps.Point(9, 12),
    scaledSize: new localGoogle.maps.Size(70, 70)
  }
  return new localGoogle.maps.Marker({
    map: localMap,
    position: data.position,
    icon
  });
}

const drawBallPos = async () => {
  try {
    const currPos = await setsetUserPosition();
    if (!isBallMoved){
      firstBall = drawIcon({
        icon: icons.ball,
        position: currPos
      }) 
      isBallMoved = true;
      return currPos; 
    }
  }
  catch(e) {
    console.error(e);
  }
}

const drawGoalPos = async (pos) => {
  const ballPos = await pos;
  let goalPos;
  try {
    if (!ballPos) {
      goalPos = { lat: 32.12039583617502, lng: 34.83239034598204 };
    }
    else {
      goalPos = await coordinateService.setRandomLocationByRadius(ballPos);
    }
    drawIcon({
      icon: icons.goal,
      position: goalPos
    })
    return goalPos;
  }
  catch(e){
    console.error(e);
  }
}

const moveBallPos = () => {
  localGoogle.maps.event.addListener(localMap, "center_changed", function() {
    let center = this.getCenter();
    let lat = center.lat();
    let lng = center.lng();
    if (firstBall) firstBall.setMap(null);
    if (lastBall) lastBall.setMap(null);
    lastBall =  drawIcon({
      icon: icons.ball,
      position: {lat,lng}
    }) 
  });
}

const isGoal = async (ballCoordinates, goalCoordinates) => {
  try {
    const ballCoords = await ballCoordinates;
    const goalCoords = await goalCoordinates;
    const ballAndGoalPos = {ballPos: ballCoords, goalPos: goalCoords}
    const dist = await coordinateService.getDistBetween(ballAndGoalPos);
    if (dist.dist <= 30) { // it's too difficult when dist is 10, so I changed it to 30.
      if (!isGameOver) {
        isGameOver = true;
        swal("Goal!!!");
        clearInterval(interval);
      }
    } 
  }
  catch(e){
    console.error(e);
  }
}

// React.memo - React renders the component and memoizes the result. 
// if the new props are the same, React reuses the memoized result skipping the next rendering.
export const MapPage = React.memo(function Map (props) {
  const API_KEY = process.env.REACT_APP_AUTH_KEY;
  const { ref, map, google } = useGoogleMaps(
    API_KEY,
    {
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      zoom: 15,
      center: {lat: 32.1257472, lng: 34.8258304},
      zoomControl: false,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    }
  );

  localGoogle = google;
  localMap = map;
  if (localMap) {
    const ballPos = drawBallPos();
    let goalPos;
    if (!goalFlag) { // render goal only when needed.
      goalFlag = true;
      goalPos = drawGoalPos(ballPos);
    }

     interval = setInterval(() => { // check user position changes.
      moveBallPos();
      let center = localMap.getCenter();
      let lat = center.lat();
      let lng = center.lng()
      if (lat && lng) {
         isGoal({lat, lng}, goalPos);
      }
    }  
    , 3000);
  }
  
  return (
    <div className="container">
      <div className="app-desc">
        Score a goal by dragging the ball
      </div>
      <div ref={ref} style={{ width: '90vw', height: '70vh' }} className="map" />
    </div>
  )
})