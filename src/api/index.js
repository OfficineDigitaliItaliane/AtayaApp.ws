import Express from 'express'

import path from 'path'
const express = Express()
const mockApi = require('./mock')
const cmsApi = require('./cms')

express.use('/docs', Express.static(path.join(__dirname, '../../docs/')))
express.use('/mock', mockApi)
express.use('/cms', cmsApi)

module.exports = express