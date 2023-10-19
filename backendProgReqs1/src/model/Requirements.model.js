const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Projects = require('./Projects.model');

const Requirements = sequelize.define("requirements", {
    ident_requirement_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      characteristicsr: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.TEXT,
      },
      req_no_funtional: {
        type: DataTypes.TEXT,
      },
      priority_req: {
        type: DataTypes.STRING,
        allowNull: false,
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
      tableName: 'requirements',
      timestamps: false,
      underscored: true,
      sequelize,
    }
  );


    Requirements.belongsTo(Projects, {foreignKey: 'project_id'});

module.exports = Requirements;