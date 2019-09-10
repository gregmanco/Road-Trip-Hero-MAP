var connection = require("../db/connection");
var getLocationInfo = require("../public/assets/js/getLocationInfo.js");
// db/orm-models.js is the ORM models file which links to the config/orm.js
var ormQueries = require("../db/orm-models.js");
module.exports = function(app) {
  // ============ Express App TEST ============
  app.get("/api/testserver", function(req, resExpress) {
    resExpress.send("Express server is working - TEST PASSED!");
  });

  // ============ Database TEST ============
  app.get("/api/testdb", function(req, resExpress) {
    connection.query("SELECT * FROM userProfiles", function(err, resSQL) {
      if (err) throw err;
      resExpress.send(
        "mySQL DB working! TEST PASSED" + "<hr>" + JSON.stringify(resSQL)
      );
    });
  });

  // ============ Get user profile route ============
  app.get("/api/userprofile/:uid", function(req, resExpress) {
    userId = req.params.uid;
    ormQueries.selectUserPofile(userId, function(data) {
      // console.log(data);
      resExpress.json(data);
      console.log(data)
    });
  });

  app.post("/api/insertuser", function(req, resExpress) {
    ormQueries.insertUser(
      ["name", "email", "photoUrl", "uid"],
      [req.body.name, req.body.email, req.body.photoUrl, req.body.uid],
      function(result) {
      
        resExpress.json({ id: result.insertId });
      }
    );
  });

  app.post("/api/savetripplan", function(req, resExpress) {
    ormQueries.insertData(
      ["userId", "tripName", "origin", "destination", "numberOfStops"],
      [
        req.body.userid,
        req.body.tripname,
        req.body.origin,
        req.body.destination,
        req.body.numberofstops
      ],
      function(result) {
        // Send back the ID of the new roadtripHero item
        resExpress.json({ id: result.insertId });
      }
    );
  });

  // ============ Get all trip plans by user items ============
  app.get("/api/gettripplans/:userid", function(req, resExpress) {
    userId = req.params.userid;
    console.log("condition hit!")
    console.log(userId)
    console.log(req.params.userid)
    ormQueries.getTripPlans(userId, function(data) {
      console.log(data);
      resExpress.json(data);
    });
  });

    // ============ Get all trip plans by user items ============
    app.get("/api/gettripplan/:tripid", function(req, resExpress) {
      tripId = req.params.tripid;
      console.log("condition hit!")
      console.log(tripId)
      console.log(req.params.tripid)
      ormQueries.getTripPlan(tripId, function(data) {
        console.log(data);
        resExpress.json(data);
      });
    });
  
  app.delete("/api/deletetripplan/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log(req.params.id)
    ormQueries.deleteTripPlan(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

  app.get("/api/safetyscore/:lat/:lng", function(req, resExpress) {
    var lat = req.params.lat;
    var lng = req.params.lng;
    getLocationInfo.getZipCode(lat, lng, function(result) {
      var zipCode = result;

      getLocationInfo.safetyScore(zipCode, function(result) {
        var safetyScore = result;
        resExpress.json({ zipCode: zipCode, safetyScore: safetyScore });
      });
    });
  });

  // app.post("/api/route", function(req, resExpress) {
  //       resExpress.json({ stopsOnRoutes: req.body.stopsOnRoutes });
  //       console.log(req.body.stopsOnRoutes)
  // });
  // end var ormQueries
};
