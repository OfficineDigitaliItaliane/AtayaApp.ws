'use strict'

import morgan from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import errorHandler from 'errorhandler'
import logger from './logger'
import expressRequestId from 'express-request-id'

export default (app) => {

  app.use(new expressRequestId())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
  app.use(methodOverride())

  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type')
    next()
  })

  app.use(morgan('combined', {'stream': logger.stream}))
  app.use(errorHandler())
}