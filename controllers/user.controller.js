'use strict'
 
const repository = require('../repositories/user.repository')
const crtlBase = require('../bin/base/controller.base')
const validation = require('../bin/helpers/validation')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables')

const _repo = new repository()


 function userController() {

}

userController.prototype.authenticate = async (req, resp, next) => {
     let _validationContract = new validation

     _validationContract.isRequired(req.body.email, 'Informe o email')
     _validationContract.isRequired(req.body.password, 'Informe a senha')
     _validationContract.isEmail(req.body.email, 'Email Inválido')

     if(!_validationContract){
          resp.status(400).send({message: 'Não foi possivel efetuar o login', validation: _validationContract.errors()})
          return
     }
     
     let userAuthorized = await _repo.authenticate(req.body.email, req.body.password)
     if(userAuthorized) {
          resp.status(200).send({
               user: userAuthorized,
               token: jwt.sign({user: userAuthorized}, variables.Security.secretKey)
          })
     } else {
          resp.status(404).send({message: 'Usuário e senha informados são inválidos'})
     }

} 

userController.prototype.post = async(req, resp, next) => {  
     let _validationContract = new validation

     _validationContract.isRequired(req.body.name, 'Informe seu nome')
     _validationContract.isRequired(req.body.email, 'Informe seu email')
     _validationContract.isEmail(req.body.email, 'Email informado não é válido')
     _validationContract.isRequired(req.body.password, 'Informe a senha')
     _validationContract.isRequired(req.body.confirmedPassword, 'A senha de confirmação é obrigatória')
     _validationContract.isTrue(req.body.password != req.body.confirmedPassword, 'A senha e a confirmação não são iguais')

     let userIsEmailExist = await _repo.isEmailExist(req.body.email)
         
     if(userIsEmailExist) {
          _validationContract.isTrue((userIsEmailExist.name != undefined ), `Já existe o email ${req.body.email} cadastrado`)
     }    
         
     if(req.body.password){
          req.body.password = md5(req.body.password)          
     }

     crtlBase.post(_repo, _validationContract, req, resp)
}

userController.prototype.put = async(req, resp, next) => {
     let _validationContract = new validation

     _validationContract.isRequired(req.body.name, 'Informe seu nome')
     _validationContract.isRequired(req.body.email, 'Informe seu email')
     _validationContract.isEmail(req.body.email, 'Email informado não é válido')
     _validationContract.isRequired(req.params.id, 'Informe o ID do usuário que será alterado')

     let userIsEmailExist = await _repo.isEmailExist(req.body.email)
     if(userIsEmailExist) {
          _validationContract.isTrue(
               (userIsEmailExist.name != undefined) && 
               (userIsEmailExist._id != req.params.id), 
               `Já existe o email ${req.body.email} cadastrado`)
     }

     crtlBase.put(_repo, _validationContract, req, resp)
}

userController.prototype.get = async(req, resp, next) => {
     return await crtlBase.get(_repo, req, resp)
}

userController.prototype.getById = async(req, resp, next) => {
     return await crtlBase.getById(_repo, req, resp)
}

userController.prototype.delete = async(req, resp, next) => {
     return await crtlBase.delete(_repo, req, resp)
}

module.exports = userController