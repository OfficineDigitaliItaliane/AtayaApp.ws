import Express from 'express'

import path from 'path'
const express = Express()
const mockApi = require('./mock')
const cmsApi = require('./cms')
const appApi = require('./app')

express.use('/docs', Express.static(path.join(__dirname, '../../docs/')))
express.use('/cms', cmsApi)
express.use('/app', appApi)
express.use('/mock', mockApi)

module.exports = express