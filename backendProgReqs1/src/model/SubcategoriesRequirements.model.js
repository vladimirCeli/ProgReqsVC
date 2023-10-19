const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const CategoriesRequirements = require('./CategoriesRequirements.model');

const SubcategoriesRequirements = sequelize.define("subcategories_requirements", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    original: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    }
  },
    {
      tableName: 'subcategories_requirements',
      timestamps: false,
      underscored: true,
      sequelize,
    }
  );

    SubcategoriesRequirements.belongsTo(CategoriesRequirements, {foreignKey: 'categories_requirements_id'});
  
  module.exports = SubcategoriesRequirements;