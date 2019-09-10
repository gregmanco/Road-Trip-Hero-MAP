google.load("visualization", "1", {
  packages: ["corechart", "table", "geomap"]
});
var tableid = 1499916;
var map = null;
var polyline = new google.maps.Polyline({
  path: [],
  strokeColor: "#FF0000",
  strokeWeight: 3
});
var bounds = new google.maps.LatLngBounds();
var directions = null;
var distance = null; // km
var service = null;
var gmarkers = [];
var boxes = null;
var zipcodes = [];
var infowindow = new google.maps.InfoWindow();
var markerType = "amber";
var features = [];
// Marker icons used for path

var icons = {
  dred: {
    icon: "https://res.cloudinary.com/dvustpvvn/image/upload/c_scale,h_50/v1568056279/Dred.png"
  },
  bred: {
    icon: "https://res.cloudinary.com/dvustpvvn/image/upload/c_scale,h_50/v1568056306/Bred.png"
  },
  damber: {
    icon: "https://res.cloudinary.com/dvustpvvn/image/upload/c_scale,h_50/v1568056315/Damber.png"
  },
  lamber: {
    icon: "https://res.cloudinary.com/dvustpvvn/image/upload/c_scale,h_50/v1568056335/Lamber.png"
  },
  bgreen: {
    icon: "https://res.cloudinary.com/dvustpvvn/image/upload/c_scale,h_50/v1568056292/Bgreen.png"
  },
  dgreen: {
    icon: "https://res.cloudinary.com/dvustpvvn/image/upload/c_scale,h_50/v1568056286/Dgreen.png"
  },
  red: {
    icon: "http://maps.google.com/mapfiles/kml/pal4/icon7.png"
  },
  amber: {
    icon: "http://maps.google.com/mapfiles/kml/pal4/icon23.png"
  },
  green: {
    icon: "http://maps.google.com/mapfiles/kml/pal4/icon54.png"
  }
};

function initialize() {
  // Default the map view to the continental U.S.
//   let queryTrip = "/api/gettripplan/1";

// $.get(queryTrip)
//   .then(function(res, status) {
  var mapOptions = {
    center: new google.maps.LatLng(40, -80.5),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 8
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  service = new google.maps.places.PlacesService(map);

  directionService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

  // If there are any parameters at eh end of the URL, they will be in  location.search
  // looking something like  "?marker=3"

  // skip the first character, we are not interested in the "?"
  var query = location.search.substring(1);

  // split the rest at each "&" character to give a list of  "argname=value"  pairs
  var pairs = query.split("&");
  for (var i = 0; i < pairs.length; i++) {
    // break each pair at the first "=" to obtain the argname and value
    var pos = pairs[i].indexOf("=");
    var argname = pairs[i].substring(0, pos).toLowerCase();
    var value = pairs[i].substring(pos + 1).toLowerCase();

    // process each possible argname  -  use unescape() if theres any chance of spaces
    if (argname == "to") {
      document.getElementById("to").value = unescape(value);
    }
    if (argname == "from") {
      document.getElementById("from").value = unescape(value);
    }
    if (argname == "dist") {
      document.getElementById("distance").value = parseFloat(value);
    }
    if (argname == "type") {
      document.getElementById("type").value = unescape(value);
    }
    if (argname == "keyword") {
      document.getElementById("keyword").value = unescape(value);
    }
    if (argname == "name") {
      document.getElementById("name").value = unescape(value);
    }
    if (argname == "submit") {
      route();
    }
  }
}

function route() {
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  // Make the directions request
  directionService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);

      
      zipcodes = [];
      var path = response.routes[0].overview_path;
      var legs = response.routes[0].legs;

      document.getElementById("zipcodes").innerHTML =
        "<b>zipcodes along route:</b><br>";
      // Find the Safety Score of the Zip Code and return it
      for (var i = 0; i < path.length; i = i + 20) {
        var latVal = path[i].lat();
        var lngVal = path[i].lng();

        features.push({
          position: { lat: latVal, long: lngVal }
          // type: markerType
        });
      }

      // console.log(features);

      features.forEach(function(data) {
        let queryString =
          "/api/safetyscore/" + data.position.lat + "/" + data.position.long;

        $.get(queryString)
          .then(function(res, status) {
            if (res.safetyScore >= 90) {
              data.type = "dgreen";
            } else if (res.safetyScore > 80 && res.safetyScore < 89) {
              data.type = "bgreen";
            } else if (res.safetyScore > 60 && res.safetyScore < 79) {
              data.type = "damber";
            } else if (res.safetyScore > 40 && res.safetyScore < 59) {
              data.type = "lamber";
            } else if (res.safetyScore > 20 && res.safetyScore < 39) {
              data.type = "bred";
            } else {
              data.type = "dred";
            }
          })
          .then(function() {
            console.log(data.type);

            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(
                data.position.lat,
                data.position.long
              ),
              icon: icons[data.type].icon,
              map: map
            });
          });
      });
    } else {
      alert("Directions query failed: " + status);
    }
  });
}
