const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SubcategoriesRequirements = require('./SubcategoriesRequirements.model');

const RequirementsSecurity = sequelize.define("requirements_security", {
    numeration: {
        type: DataTypes.STRING,
      },
      level_requirements: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      description: {
        type: DataTypes.TEXT,
      },
      cwe: {
        type: DataTypes.STRING,
      },
      nist: {
        type: DataTypes.STRING,
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
      tableName: 'requirements_security',
      timestamps: false,
      underscored: true,
      sequelize,
    }
  );


    RequirementsSecurity.belongsTo(SubcategoriesRequirements, {foreignKey: 'subcategories_requirements_id'});

module.exports = RequirementsSecurity;