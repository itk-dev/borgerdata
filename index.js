const dotenv = require('dotenv');
dotenv.config()

const express = require('express')
const app = express()
const port = 8081

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile.js')[environment];
const knex = require('knex')(configuration);

let database = process.env.SQL_DATABASE
let schema = process.env.SQL_SCHEMA
let table = process.env.SQL_TABLE

const target = `${database}.${schema}.${table}`

app.get('/citizen/:cpr', async (req, res) => {

    let cpr = req.params.cpr

    if (cpr.length != 10 || !parseInt(cpr)) {
        res.status(400).send('Bad Request')
    } else {
        knex(target)
            .where({CPR: cpr})
            .limit(1)
            .then((data) => {
                if (data === undefined || data.length == 0) {
                    res.status(404).send('Not found')
                } else {
                    res.send(JSON.stringify(data));
                }
            }
        )
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))