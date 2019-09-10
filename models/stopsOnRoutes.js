module.exports = function(sequelize, DataTypes) {
  var stopsOnRoutes = sequelize.define(
    "stopsOnRoutes",
    {
      tripId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
        vaildate: {
          len: [1, 500]
        }
      }
    },
    { timestamps: false }
  );
  return stopsOnRoutes;
};
