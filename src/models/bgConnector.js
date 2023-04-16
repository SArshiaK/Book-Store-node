'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bgconnector extends Model{
        static associate(models){

        }
    }
    Bgconnector.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        bookId: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        groupId: {
            allowNull: false,
            type: DataTypes.STRING,
        }

    },
    {

        sequelize,
        modelName: 'Bgconnector',
    });
    return Bgconnector;
}