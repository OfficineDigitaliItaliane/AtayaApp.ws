'use strict'

require('dotenv').config()
require('babel-register')
require("babel-polyfill")
exports = module.exports = require('./src/app')