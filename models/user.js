module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Authentication: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  //Creating an association in the Party table
  // User.associate = function(models) {
  //   User.hasMany(models.Party, {
  //     onDelete: "cascade"
  //   });
  // };

  // User.associate = function(models) {
  //   User.hasMany(models.Item, {
  //     onDelete: "cascade"
  //   });
  // };

  // User.associate = function(models) {
  //   User.belongsToMany(models.Party, {
  //     as: "Parties",
  //     through: { model: models.Attendee, unique: false },
  //     foreignKey: "user_id"
  //   });
  // };

  return User;
};
