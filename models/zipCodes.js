module.exports = function (sequelize, DataTypes) {
    var zipCodes = sequelize.define("zipCodes", {
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            vaildate: {
                len: [1, 100]
            }
        },
        decommissioned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        primary_city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        acceptable_cities: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        unacceptable_cities: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        county: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        area_codes: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        world_region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        latitude: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        longitude: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        irs_estimated_population_2015: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {timestamps: false   
    });
    return zipCodes;
};