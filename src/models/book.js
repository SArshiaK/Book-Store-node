'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model{
        static associate(models){
            Book.belongsTo(models.Author, {foreignKey: 'authorId', onUpdate: 'cascade', onDelete: 'cascade'});
            Book.hasMany(models.Bgconnector, {as: 'connections'});
            Book.hasOne(models.Group)
        }
    }
    Book.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT('medium'),
        },
        price:{
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        stock: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        publishDAte: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        authorId:{
            allowNull: false,
            type: DataTypes.INTEGER
        }

    },
    {
        sequelize,
        modelName: 'Book',
    });
    return Book;
}