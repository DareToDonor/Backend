
module.exports = (sequelize, DataTypes) => {
  const DonorLocation = sequelize.define('DonorLocation', {
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

  return DonorLocation;
};