const dotenv = require('dotenv');
dotenv.config()

let moduleExport = {
    development: {
        client: "mssql",
        connection: {
            server : process.env.SQL_SERVER,
            user : process.env.SQL_USER,
            password : process.env.SQL_PASSWORD,
            database : process.env.SQL_DATABASE,
            options: {
            port: process.env.SQL_PORT
            }
        },
        migrations: {
            directory: __dirname + "/migrations"
        },
        seeds: {
            directory: __dirname + "/seeds"
        }
    }
}

if (process.env.SQL_DOMAIN) {
    moduleExport.development.connection.domain = process.env.SQL_DOMAIN
}

module.exports = moduleExport