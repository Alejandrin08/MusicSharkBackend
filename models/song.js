'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    static associate(models) {
      song.belongsToMany(models.musicgenre, { as: 'musicgenres', through: 'musicgenresong', foreignKey: 'songid' });
      song.belongsTo(models.file);
    }
  }
  song.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: 'Without title'
    },
    artist: {
      type: DataTypes.STRING,
      defaultValue: 'Without artist'
    },
    album: {
      type: DataTypes.STRING,
      defaultValue: 'Without album'
    },
    duration: {
      type: DataTypes.TIME,
      defaultValue: '00:00:00'
    },
    fileid: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    freezeTableName: true,
    modelName: 'song',
  });
  
  return song;
};