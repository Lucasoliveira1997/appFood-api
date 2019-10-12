'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authentication.js')

const Controller = require('../controllers/user.controller')

const _ctrl = new Controller()

//public access
router.post('/auth', _ctrl.authenticate)
router.post('/register', _ctrl.post)

//private access
router.post('/', auth, _ctrl.post)
router.get('/', auth, _ctrl.get)
router.get('/:id',auth, _ctrl.getById)
router.put('/:id',auth, _ctrl.put)
router.delete('/:id',auth, _ctrl.delete)

module.exports = router