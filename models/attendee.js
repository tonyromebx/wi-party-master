module.exports = function(sequelize, DataTypes) {
  var Attendee = sequelize.define("Attendee", {
    AuthenticationId: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Attendee.associate = function(models) {
    Attendee.hasMany(models.Item, {
      foreignKey: "attendeeAuthenticationId",
      allowNull: false,
      onDelete: "cascade"
    });
  };

  return Attendee;
};
