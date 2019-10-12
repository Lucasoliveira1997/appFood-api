'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
    name: {type: String, required: true, trim: true, index: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photo: {type: String},
    active: {type: Boolean, default: true},
    createDate: {type: Date, default: Date.now}
},{versionKey: false})

userModel.pre('save', next => {
    let now = new Date()

    if (this.CreateDate){
        this.CreateDate = now
    }
    next()
})

module.exports = mongoose.model('usuario', userModel)