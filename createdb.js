const dotenv = require('dotenv')
dotenv.config()

let configuration = require('./knexfile.js')
configuration.connection.database = 'master'
const knex = require('knex')(configuration)

const database = process.env.SQL_DATABASE
const schema = process.env.SQL_SCHEMA

//const createDatabaseSql = `CREATE DATABASE ${database}`
const createDatabaseSql = `
USE master

IF NOT EXISTS (SELECT name
    FROM sys.databases
    WHERE name = '${database}')
BEGIN
    EXEC sp_executesql N'CREATE DATABASE ${database};';
END
`

const createSchemaSql = `
USE ${database};

IF NOT EXISTS (SELECT schema_name 
    FROM information_schema.schemata
    WHERE schema_name = '${schema}')
BEGIN
    EXEC sp_executesql N'CREATE SCHEMA ${schema};';
END
`

async function createDatabase() {

    await knex.raw(createDatabaseSql)
    await knex.raw(createSchemaSql)

    await knex.destroy()
}

createDatabase();