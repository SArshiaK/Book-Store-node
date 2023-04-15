'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Author extends Model{
        static associate(models){

        }
    }
    Author.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        authorName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: 'Author',
    });
    return Author;
}