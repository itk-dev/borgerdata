const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const port = process.env.APP_PORT

const configuration = require('./knexfile.js')
const knex = require('knex')(configuration)

const database = process.env.SQL_DATABASE
const schema = process.env.SQL_SCHEMA
const table = process.env.SQL_TABLE

const target = `${database}.${schema}.${table}`

app.get('/citizen/:cpr', async (req, res) => {
  const cpr = req.params.cpr

  if (cpr.length !== 10 || !parseInt(cpr)) {
    res.status(400).send('Bad Request')
  } else {
    knex(target)
      .where({ CPR: cpr })
      .first()
      .then((data) => {
        if (data === undefined || data.length === 0) {
          res.status(404).send('Not found')
        } else {
          res.send(JSON.stringify(data))
        }
      }
      )
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
