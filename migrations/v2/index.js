'use strict'

require('dotenv').config()
require('babel-register')
require("babel-polyfill")

exports = exports.default = require('./v1_to_v2')
