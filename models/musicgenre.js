'use strict';

const {  Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class musicgenre extends Model {
    static associate(models) {
      musicgenre.belongsToMany(models.song, { through: 'musicgenresong', foreignKey: 'musicgenreid'});
    }
  }

  musicgenre.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    protected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'musicgenre',
  });
  return musicgenre;
};