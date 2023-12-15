
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('donor_locations', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    address: DataTypes.TEXT,
    status: DataTypes.STRING,
    image: DataTypes.STRING
  },{
    tableName: 'donor_locations',
    timestamps: true,
  });

  return Event;
};