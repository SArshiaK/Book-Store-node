'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class InvoiceDetail extends Model{
        static associate(models){
            InvoiceDetail.belongsTo(models.Invoice, {foreignKey: 'invoiceId', onUpdate: 'cascade', onDelete: 'cascade'});
            InvoiceDetail.belongsTo(models.Book, {foreignKey: 'BookId', onUpdate: 'cascade', onDelete: 'cascade'});
        }
    }
    InvoiceDetail.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        BookId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        invoiceId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        row: {
            allowNull: false,
            type: DataTypes.TINYINT
        },
        quantity: {
            allowNull: false,
            type: DataTypes.SMALLINT
        },
        unitPrice: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        discount: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        totalPrice: {
            allowNull: true,
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'InvoiceDetail',
    });

    InvoiceDetail.beforeCreate(async (invoicedetail, options) => {
        const totalPrice =(( invoicedetail.quantity * invoicedetail.unitPrice ) * (100 - invoicedetail.discount))/100;
        invoicedetail.totalPrice = totalPrice;
        // console.log(totalPrice)
      });

    return InvoiceDetail;
}