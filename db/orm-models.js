var orm = require("../config/orm.js");

var ormQueries = {
  selectUserPofile: function(findUser, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.selectUserPofile("userProfiles", "uid", findUser, function(res) {
      cb(res);
    });
  },

  insertUser: function(cols, vals, cb) {
    orm.insertUser("userProfiles", cols, vals, function(res) {
      cb(res);
    });
  },

  insertData: function(cols, vals, cb) {
    orm.insertData("tripPlans", cols, vals, function(res) {
      cb(res);
    });
  },

  getTripPlans: function(findUser, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.getTripPlans(findUser, function(res) {
      cb(res);
    });
  },
  
  getTripPlan: function(tripId, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.getTripPlan(tripId, function(res) {
      cb(res);
    });
  },

  deleteTripPlan: function(condition, cb) {
    orm.deleteTripPlan("tripPlans", condition, function(res) {
      cb(res);
    });
  }
};

module.exports = ormQueries;
