'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Discount extends Model{
        static associate(models){
            Discount.belongsTo(models.Customer, {foreignKey: 'CustomerId', onUpdate: 'cascade', onDelete: 'cascade'});
            Discount.belongsTo(models.Book, {foreignKey: 'BookId', onUpdate: 'cascade', onDelete: 'cascade'});
            // Discount.hasMany(models.Bgconnector, {as: 'connections'});
            // Discount.hasMany(models.InvoiceDetail);
            // Discount.hasOne(models.Group)
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
        CustomerId: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        BookId:{
            allowNull: true,
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'Discount',
    });
    return Discount;
}