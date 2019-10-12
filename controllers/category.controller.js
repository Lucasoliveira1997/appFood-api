'use strict'

const repository = require('../repositories/category.repository')
const ctrlBase = require('../bin/base/controller.base')
const validation = require('../bin/helpers/validation')
const _repo = new repository

function categoryController() {

}

categoryController.prototype.post = async (req, resp, next) => {
    let _validationContract = new validation

    _validationContract.isRequired(req.body.title, 'Informe um titulo')
    _validationContract.isRequired(req.body.description, 'Informe uma descrição')
    _validationContract.isRequired(req.body.photo, "A foto é obrigatória")

    ctrlBase.post(_repo, _validationContract, req, resp)
}

categoryController.prototype.put = async (req, resp, next) => {
    let _validationContract = new validation

    _validationContract.isRequired(req.body.title, 'Informe um titulo')
    _validationContract.isRequired(req.body.description, 'Informe uma descrição')
    _validationContract.isRequired(req.body.photo, "A foto é obrigatória")
    _validationContract.isRequired(req.params.id, 'O id a ser mudado é requisitado')

    ctrlBase.put(_repo, _validationContract, req, resp)
}

categoryController.prototype.get = async (req, resp, next) => {
    ctrlBase.get(_repo, req, resp)
}

categoryController.prototype.getById = async (req, resp, next) => {
    ctrlBase.getById(_repo, req, resp)
}

categoryController.prototype.delete = async (req, resp, next) => {
    ctrlBase.delete(_repo, req, resp)
}

module.exports = categoryController