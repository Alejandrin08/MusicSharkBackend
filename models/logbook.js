'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class logbook extends Model {
    static associate(models) {
      
    }
  }
  logbook.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idelement: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'logbook',
  });
  return logbook;
};