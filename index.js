"use strict"
const express = require('express')
const app = express()

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

require('express-async-errors')

const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

//! Accept JSON Data
app.use(express.json())


//! Call static uploadFile:
app.use('/upload', express.static('./upload'))



//!Middlawares
app.use(require('./src/middlewares/authentication'))
app.use(require('./src/middlewares/logger'))
app.use(require('./src/middlewares/queryHandler'))



//! Routes
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to CactusInk Blog',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

app.use(require('./src/routes'))

//! Error Handler
app.use(require('./src/middlewares/errorHandler'))


//! RUN SERVER
app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`))

// require('./src/helpers/sync')()