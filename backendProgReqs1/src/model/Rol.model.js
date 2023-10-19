const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rol = sequelize.define('rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
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
  tableName: 'rol',
  timestamps: false,
  underscored: true,
  sequelize,
}
  );
  module.exports = Rol;