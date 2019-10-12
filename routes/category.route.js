'use strict'

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/category.controller')
const auth = require('../middlewares/authentication.js')

let _ctrl = new Controller()

router.get('/', auth, _ctrl.get)
router.get('/:id', auth, _ctrl.getById)
router.post('/', auth, _ctrl.post)
router.put('/:id', auth, _ctrl.put)
router.delete('/:id', auth, _ctrl.delete)

module.exports = router