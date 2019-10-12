'use strict'

require('../models/product.model')
const Base = require('../bin/base/repository.base')


class ProductRepository {

    constructor(){
        this._base = new Base('produto')
    }

    async create(data) {
        return this._base.create(data)
    }

    async update(id, data) {
        return this._base.update(id, data)
    }

    async getAll() {
        return this._base.getAll()
    }

    async getById(id) {
        return this._base.getById(id)
    }

    async delete(id) {
        return this._base.delete(id)
    } 
}

module.exports = ProductRepository