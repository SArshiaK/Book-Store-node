'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CiConnector extends Model{
        static associate(models){
            CiConnector.belongsTo(models.Customer, {foreignKey: 'customrId', onUpdate: 'cascade', onDelete: 'cascade'});
            CiConnector.belongsTo(models.Invoice, {foreignKey: 'invoiceId', onUpdate: 'cascade', onDelete: 'cascade', as:'invId'});

        }
    }
    CiConnector.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        customrId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        invoiceId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }

    },
    {
        sequelize,
        modelName: 'CiConnector',
    });
    return CiConnector;
}