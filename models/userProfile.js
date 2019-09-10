module.exports = function (sequelize, DataTypes) {
    var userProfile = sequelize.define("userProfile", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            vaildate: {
                len: [1, 100]
            }
        },
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [100]
            }
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {timestamps: false   
    });
    return userProfile;
};