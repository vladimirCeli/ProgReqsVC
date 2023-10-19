const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Rol = require('./Rol.model');

const Person = sequelize.define("person", {
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    confirmation_token: {
      type: DataTypes.TEXT,
      unique: true,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
      unique: true,
    },
    reset_token: {
      type: DataTypes.TEXT,
      unique: true,
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
    },
    rol_id: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      references: {
        model: Rol,
        key: 'id'
      }
    },
  },
  {
    tableName: 'person',
    timestamps: false,
    underscored: true,
    sequelize,
  }
);

Person.belongsTo(Rol, {through: Person, foreignKey: 'rol_id'});
  
  module.exports = Person;