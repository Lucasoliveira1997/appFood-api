 'use strict'

const repository = require('../repositories/product.repository')
const ctrlBase = require('../bin/base/controller.base')
const validation = require('../bin/helpers/validation')
const _repo = new repository

 function productController() {

 }

 productController.prototype.post = async(req, resp, next) => {
     let _validationContract = new validation

     _validationContract.isRequired(req.body.name, "Informe o nome")
     _validationContract.isRequired(req.body.description, "Dê uma descrição do produto")
     _validationContract.isRequired(req.body.photo, "A foto é obrigatória")
     _validationContract.isRequired(req.body.price, "Informe o preço")
     
     if(req.body.price){
          _validationContract.isTrue(req.body.price == 0, 'O pre~ço não pode ser R$ 0,00')
     }

     ctrlBase.post(_repo, _validationContract, req, post)
 }

 productController.prototype.put = async(req, resp, next) => {
     let _validationContract = new validation

     _validationContract.isRequired(req.body.name, "Informe o nome")
     _validationContract.isRequired(req.body.description, "Dê uma descrição do produto")
     _validationContract.isRequired(req.body.price, "Informe o preço")
     _validationContract.isRequired(req.body.photo, "A foto é obrigatória")
     _validationContract.isRequired(req.params.id, "Necessário informar um ID")

     ctrlBase.put(_repo, _validationContract, req, post)
}

productController.prototype.get = async(req, resp, next) => {
     ctrlBase.get(_repo, req, resp)
}

productController.prototype.getById = async(req, resp, next) => {
     ctrlBase.getById(_repo, req, resp)
}

productController.prototype.delete = async(req, resp, next) => {
     ctrlBase.delete(_repo, req, resp)
}

module.exports = productController