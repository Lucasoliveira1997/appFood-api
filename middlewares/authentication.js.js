'use strict'

const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables')

module.exports = (req, resp, next) => {

    let token = req.query.query || req.headers['x-access-token'] || req.body.token

    if (token) {
        try {
            let decoded = jwt.verify(token, variables.Security.secretKey)    
            req.body.userAuthorized = decoded
            next()
        } catch (error) {
            resp.status(401).send({message: 'Token informado é inválido'})
        }
    } else {
        resp.status(401).send({message: 'Acesso Negado!'})
        return
    }
}