import express from 'express'
import config from '../config/environments'
import logger from '../config/logger'

const app = express()
const server = require('http').createServer(app)

require('../config/express').default(app)
require('./routes').default(app)

require('../config/error-handler').default(app)

server.listen(config.port, () => {
  logger.info(`Express server listening on ${config.port}, in ${config.env} mode`)
})

exports = module.exports = app