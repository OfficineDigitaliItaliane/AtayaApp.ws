'use strict'

require('dotenv').config()
require('babel-register')
require("babel-polyfill")

exports = exports.default = require('./old_read_to_json')
