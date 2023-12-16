module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    // Define your fields here
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    // ...
  },{
    tableName: 'news',
    timestamps: true,
  });

  return News;
};
