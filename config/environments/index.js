'use strict'

const path = require('path')
const _ = require('lodash')

const all = {
  env: process.env.NODE_ENV || 'development',

  // Root path of the server
  root: path.normalize(__dirname + '/../..'),

  // Auth port
  port: process.env.PORT || 5000,

  // Secret for JWT
  secrets: {
    session: process.env.JWT_SECRET
  },
}

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {})