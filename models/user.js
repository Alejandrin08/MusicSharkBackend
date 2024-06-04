'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsTo(models.role);
    }
  }

  user.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    protected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    roleid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'user',
  });
  return user;
};