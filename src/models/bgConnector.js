'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bgconnector extends Model{
        static associate(models){
            Bgconnector.belongsTo(models.Book, {foreignKey: 'bookId', onUpdate: 'cascade', onDelete: 'cascade'});
            Bgconnector.belongsTo(models.Group, {foreignKey: 'groupId', onUpdate: 'cascade', onDelete: 'cascade'});

        }
    }
    Bgconnector.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        bookId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        groupId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }

    },
    {

        sequelize,
        modelName: 'Bgconnector',
    });
    return Bgconnector;
}