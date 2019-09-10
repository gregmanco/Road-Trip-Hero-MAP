var getLocationInfo = {
    getZipCode: function(latitude, longitude, cb) {
      // const latitude = 40.54014;
      // const longitude = -74.50975000000001;
      const key = "U1AkiJAi94sqkgylj4B1VaQh3YZxMMTt";
  
      var NodeGeocoder = require("node-geocoder");
  
      var options = {
        provider: "mapquest",
        apiKey: key
      };
  
      var geocoder = NodeGeocoder(options);
  
      geocoder
        .reverse({ lat: latitude, lon: longitude })
        .then(function(res) {
          console.log(res[0].zipcode);
          cb(res[0].zipcode);
        })
        .catch(function(err) {
          console.log(err);
          cb(-1);
        });
    }, 
    safetyScore: function(zipCode, cb) {
        cb(Math.floor(Math.random() * 101));
    }
  };

  module.exports = getLocationInfo;