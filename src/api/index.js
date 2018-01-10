import Express from 'express'

import path from 'path'
const express = Express()
const mockApi = require('./mock')

express.use('/docs', Express.static(path.join(__dirname, '../../docs/')))
express.use('/mock', mockApi)


module.exports = express