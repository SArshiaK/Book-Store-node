'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Group extends Model{
        static associate(models){

        }
    }
    Group.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        groupName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Group',
    });
    return Group;
}