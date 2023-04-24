'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Invoice extends Model{
        static associate(models){
            // Invoice.hasOne(models.CiConnector, {foreignKey: 'invoiceId', as: 'invId'});
            Invoice.belongsTo(models.Customer, {foreignKey: 'CustomerId', as: 'invoices', onUpdate: 'cascade', onDelete: 'cascade'});
            Invoice.hasMany(models.InvoiceDetail, {foreignKey: 'invoiceId'});

        }
    }
    Invoice.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        CustomerId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
        },
        paymentType: {
            allowNull: false,
            type: DataTypes.STRING
        },
        invoiceNumber: {
            allowNull: false,
            unique: true,
            type: DataTypes.INTEGER
        },
        netPrice: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize,
        modelName: 'Invoice',
    });
    return Invoice;
}