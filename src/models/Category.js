'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({Product}) {
      // define association here
      this.hasMany(Product, {foreignKey: 'product_id',  as: 'products' })
    }
  };
  User.init({
    category_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    category_name:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "Name is required"},
        notEmpty: {msg: "Name cannot be empty"},
      }
    },
    description:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: {msg: "It must be a valid Email  address"},
      }
    }
  },
  {
    sequelize,
    //define table name
    tableName: 'category',
    modelName: 'Category',
  });
  return Category;
};