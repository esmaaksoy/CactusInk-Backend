"use strict"

const router = require('express').Router()



router.use('/auth', require('./auth'))

router.use('/users', require('./user'))

router.use('/tokens', require('./token'))

router.use('/categories', require('./category'))

router.use('/blogs', require('./category'))

router.use('/comments', require('./category'))


module.exports = router