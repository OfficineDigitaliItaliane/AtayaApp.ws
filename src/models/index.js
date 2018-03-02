'use strict'

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../../config/environments'

const basename = path.basename(module.filename)
const dblogin = {}

const sequelize = new Sequelize(config.dblogin.db, config.dblogin.user, config.dblogin.pass, config.dblogin.dbconf)

let file = 'user.js'
const model = sequelize['import'](path.join(__dirname, file))
dblogin[model.name] = model

Object.keys(dblogin).forEach(function (modelName) {
    if (dblogin[modelName].associate) {
        dblogin[modelName].associate(db)
    }
})

dblogin.sequelize = sequelize // Used for transactions and query
dblogin.Sequelize = Sequelize // Used for DataTypes

var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://'+config.db.host+':'+config.db.port+'/'+config.db.db
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

Object.keys(dblogin).forEach(function (modelName) {
    db[modelName] = dblogin[modelName]
})

db.mongoose = mongoose
db.sequelize = dblogin.sequelize

module.exports = db