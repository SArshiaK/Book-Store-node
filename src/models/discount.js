'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Discount extends Model{
        static associate(models){
            Discount.hasOne(models.Invoice)
        }
    }
    Discount.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        code: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        active: {
            allowNull: false,
            defaultValue: true,
            type: DataTypes.BOOLEAN,
        },
        percent:{
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        upTo: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        ExpirationDate: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    },
    {
        sequelize,
        modelName: 'Discount',
    });
    return Discount;
}