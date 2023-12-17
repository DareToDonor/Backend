module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    address: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },{
    tableName: 'events',
    timestamps: true,
  });

  return Event;
};