const express = require('express')
const body_parser = require('body-parser')
const mongoose = require('mongoose')
const variables = require('../bin/configuration/variables')

//rotes
const categoryRouter = require('../routes/category.route')
const productRouter = require('../routes/product.route')
const userRouter = require('../routes/user.router')

const app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: false}))

mongoose.connect(variables.Database.connection, variables.Database.options)
mongoose.set('useCreateIndex', true)
    mongoose.connection.on('connected', () => console.log(`Database is connected`))
    mongoose.connection.on('disconnected', () => console.log(`Database is disconnected`))
    mongoose.connection.on('error', () => console.log(`Connection with database Failed`))

app.use('/api/categorias', categoryRouter)
app.use('/api/produtos', productRouter)
app.use('/api/usuarios', userRouter)

module.exports = app