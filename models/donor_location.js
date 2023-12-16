
module.exports = (sequelize, DataTypes) => {
  const donor_locations = sequelize.define('donor_locations', {
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    address: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    image: DataTypes.STRING
  },{
    tableName: 'donor_locations',
    timestamps: true,
  });

  return donor_locations;
};