module.exports = function (sequelize, DataTypes) {
    var tripPlans = sequelize.define("tripPlans", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tripName: {
            type: DataTypes.STRING,
            allowNull: false,
            vaildate: {
                len: [1, 500]
            }
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [255]
            }
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [255]
            }
        },
        numberOfStops: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {timestamps: false   
    });
    return tripPlans;
};