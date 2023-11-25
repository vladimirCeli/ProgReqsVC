const Sequelize = require('sequelize')

const {db} = require('./config')

const sequelize = new Sequelize(db.database, db.user, db.password, { 
    host: db.host,
    dialect: db.dialect,  
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // You may need to set this to true based on your server's SSL configuration
        },
      },
})

module.exports = sequelize