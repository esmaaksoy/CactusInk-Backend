"use strict"
const express = require('express')
const app = express()

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

require('express-async-errors')

const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()


app.use(express.json())

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


app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`))