'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({Category}) {
      // define association here
      this.belongsTo(Category, {foreignKey: 'category_id',  as: 'categories' })
    }
  };
  User.init({
    product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product_name:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "Name is required"},
        notEmpty: {msg: "Name cannot be empty"},
      }
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    unit_price: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
  },
  {
    sequelize,
    //define table name
    tableName: 'product',
    modelName: 'Product',
  });
  return Product;
};