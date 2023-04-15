'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Person extends Model {
    static associate(models) {
        Person.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'cascade', onUpdate: 'cascade'});
    }
  }
  Person.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Person',
  });
  return Person;
};