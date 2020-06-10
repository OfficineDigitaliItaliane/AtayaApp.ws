'use strict'

import fs from 'fs'
import path from 'path'
import config from '../../config/environments'

const basename = path.basename(module.filename)

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://'+config.db.user+':'+config.db.pass+'@'+config.db.dbconf.host+':'+config.db.dbconf.port+'/'+config.db.db+'?authSource=admin'
if (config.db.user == '' && config.db.pass == '') {
    mongoDB = 'mongodb://'+config.db.dbconf.host+':'+config.db.dbconf.port+'/'+config.db.db
}
mongoose.connect(mongoDB)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
//Get the default connection
var db = mongoose.connection
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db['speak'] = mongoose.model('speak', require(path.join(__dirname, 'speak.js')) )
db['write'] = mongoose.model('write', require(path.join(__dirname, 'write.js')) )
db['read'] = mongoose.model('read', require(path.join(__dirname, 'read.js')) )
db['understand'] = mongoose.model('understand', require(path.join(__dirname, 'understand.js')) )
db['final'] = mongoose.model('final', require(path.join(__dirname, 'final.js')) )
db['users'] = mongoose.model('user', require(path.join(__dirname, 'user.js')) )

db.mongoose = mongoose

module.exports = db