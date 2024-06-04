'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class file extends Model {
    static associate(models) {
      file.hasMany(models.song, { foreignKey: 'id' });
    }
  }
  file.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    indb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    data: {
      type: DataTypes.BLOB("long"),
      allowNull: true
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'file',
  });
  return file;
};