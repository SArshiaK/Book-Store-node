'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model{
        static associate(models){
            Customer.hasMany(models.CiConnector);
        }
    }
    Customer.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        customerName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING
        },
    },
    {
        sequelize,
        modelName: 'Customer',
    });
    return Customer;
}