require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pacienteRoutes = require('./routes/pacienteRoutes')
const db = require('../src/config/mongoConnect')


const app = express()

db.connect()

app.use(express.json())
app.use(cors())

app.use('/pacientes', pacienteRoutes)


module.exports = app