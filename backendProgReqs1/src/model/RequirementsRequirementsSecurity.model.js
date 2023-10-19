const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Requirements = require('./Requirements.model');
const RequirementsSecurity = require('./RequirementsSecurity.model');

const RequirementsRequirementsSecurity = sequelize.define("requirements_requirements_security", {
    requirements_id: {
        type: DataTypes.INTEGER,
        references: {
          model: Requirements,
          key: 'id'
        }
      },
      requirements_security_id: {
        type: DataTypes.INTEGER,
        references: {
          model: RequirementsSecurity,
          key: 'id'
        }
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
      tableName: 'requirements_requirements_security',
      timestamps: false,
      underscored: true,
      sequelize,
    }
  );


    Requirements.belongsToMany(RequirementsSecurity, {through: RequirementsRequirementsSecurity, foreignKey: 'requirements_id'});
    RequirementsSecurity.belongsToMany(Requirements, {through: RequirementsRequirementsSecurity, foreignKey: 'requirements_security_id'});

module.exports = RequirementsRequirementsSecurity;