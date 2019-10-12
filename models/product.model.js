'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productModel = new Schema({
    name: {type: String, required: true, trim: true, index: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, default: 0},
    active: {type: Boolean, default: true},
    photo: {type: String, required: true},
    createDate: {type: Date, default: Date.now}
},{versionKey: false})

productModel.pre('save', next => {
    let now = new Date()

    if (this.CreateDate){
        this.CreateDate = now
    }
    next()
})

module.exports = mongoose.model('produto', productModel)