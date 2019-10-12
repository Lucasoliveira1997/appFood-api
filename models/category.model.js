'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryModel = new Schema({
    title: {trim: true, index: true, required: true, type: String},
    description: {type: String},
    active: {type: Boolean, default: true},
    photo: {type: String, required: true},
    createDate: {type: Date, default: Date.now}
}, {versionKey: false})

categoryModel.pre('save', next => {
    let now = new Date

    if (!this.createDate) {
        this.createDate = now
    }
    next()
})

module.exports = mongoose.model('categoria', categoryModel)