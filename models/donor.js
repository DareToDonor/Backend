

module.exports = (sequelize, DataTypes) => {
  const Donor = sequelize.define('donor', {
    idUser: DataTypes.INTEGER,
    idLocationDonor: DataTypes.INTEGER,
    donorCode: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    date: DataTypes.DATE
  },{
    tableName: 'donor',
    timestamps: true,
  });

  return Donor;
};