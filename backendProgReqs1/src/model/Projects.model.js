const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Person = require('./Person.model');

const Projects = sequelize.define("projects", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: 'projects',
    timestamps: false,
    underscored: true,
    sequelize,
  }
);


    Projects.belongsTo(Person, {foreignKey: 'person_id'});
  
  module.exports = Projects;