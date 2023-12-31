// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Define your fields here
    idDonor: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    dateOfBirth: DataTypes.DATEONLY,
    NIK: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    bloodType: DataTypes.STRING,
    address: DataTypes.STRING,
    imageProfile: DataTypes.STRING,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    // ...
  },{
    tableName: 'users',
    timestamps: true,
  });

  return User;
};
