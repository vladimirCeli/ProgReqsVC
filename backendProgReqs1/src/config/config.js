require('dotenv').config()

module.exports = {
    db: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
    db_mongo: {
        link: process.env.LINKMONGO,
    }
}