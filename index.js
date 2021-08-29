const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const callback1 = (error, ip) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned IP:' , ip);

  const callback2 = (error, coordinates) => {
    
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
  
    const callback3 = (error, riseTime) => {
      
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
    
      for (let i = 0; i < riseTime.length; i++) {
        console.log(riseTime[i]);
      }
    
    };

    fetchISSFlyOverTimes(coordinates, callback3);

  };

  fetchCoordsByIP(ip, callback2);

};

fetchMyIP(callback1);


const callback4 = (error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
};

nextISSTimesForMyLocation(callback4);



