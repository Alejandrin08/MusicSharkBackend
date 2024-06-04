'use strict';
const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    static associate(models) {
      role.hasMany(models.user, { foreignKey: 'roleid' });
    }
  }
  role.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'role',
  });
  return role;
};