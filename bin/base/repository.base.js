'use strict'

const mongoose = require('mongoose')

class repositoryBase {

    constructor(model) {
        this._model = mongoose.model(model)
    }

    async create(data) {
        let model = new this._model(data)
        let resultado = await model.save()
        return resultado
    }

    async update(id, data) {
        await this._model.findByIdAndUpdate(id, {$set: data})
        let resultado = this._model.findById(id)
        return resultado
    }

    async getAll() {
        let finded = await this._model.find()
        return finded
    }

    async getById(id) {
        let finded = await this._model.findById(id)
        return finded
    }

    async delete(id) {
        let deleted = await this._model.findByIdAndRemove(id)
        return deleted
    }
}

module.exports = repositoryBase