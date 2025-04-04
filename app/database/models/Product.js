const { DataTypes, Model} = require('sequelize');
const sqlClient = require('../sequelizeClient');

class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM(["food", "drink"]),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    isDiscounted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    }

}, { 
    sequelize: sqlClient,
    modelName: 'Product',
    paranoid: true
});


// (async() => {
//     await Product.sync({
//         alter: true
//     })
// })()

module.exports = Product