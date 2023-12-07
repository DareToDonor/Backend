'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class donor_location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  donor_location.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    address: DataTypes.TEXT,
    status: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'donor_location',
  });
  return donor_location;
};