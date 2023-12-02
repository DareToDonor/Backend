module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    // Define your fields here
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    // ...
  },{
    tableName: 'news',
    timestamps: true,
  });

  return News;
};
