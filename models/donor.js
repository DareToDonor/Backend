module.exports = (sequelize, DataTypes) => {
  const Donor = sequelize.define('donor', {
    idUser: DataTypes.INTEGER,
    idLocationDonor: DataTypes.INTEGER,
    donorCode: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    date: DataTypes.DATE
  },{
    tableName: 'donors',
    timestamps: true,
  });
  Donor.associate = models =>{
    Donor.belongsTo(models.User, {
      foreignKey: "idUser",
      onDelete: "cascade"
    });
    Donor.belongsTo(models.DonorLocation, {
      foreignKey: "idLocationDonor",
      onDelete: "cascade"
    })
  }

  return Donor;
};