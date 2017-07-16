'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Task', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    created: DataTypes.TIME,
    spent: DataTypes.INTEGER,
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}
