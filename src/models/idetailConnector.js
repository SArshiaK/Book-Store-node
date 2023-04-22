'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class IdetailConnector extends Model{
        static associate(models){
            IdetailConnector.belongsTo(models.Invoice, {foreignKey: 'invoiceId', onUpdate: 'cascade', onDelete: 'cascade', as: 'invoiId'});
            IdetailConnector.belongsTo(models.InvoiceDetail, {foreignKey: 'detailId', onUpdate: 'cascade', onDelete: 'cascade'});

        }
    }
    IdetailConnector.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        invoiceId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        detailId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }

    },
    {
        sequelize,
        modelName: 'IdetailConnector',
    });
    return IdetailConnector;
}