require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pacienteRoutes = require('./routes/pacienteRoutes')
const userRoutes = require("./routes/userRoutes") // ajuste feito para que as rotas funcione
const db = require('../src/config/mongoConnect')


const app = express()

db.connect()

app.use(express.json())
app.use(cors())

app.use('/pacientes', pacienteRoutes, userRoutes)


module.exports = app