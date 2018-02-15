'use strict'

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../../config/environments'

const basename = path.basename(module.filename)
const db = {}

const sequelize = new Sequelize(config.db.db, config.db.user, config.db.pass, config.db.dbconf)

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename)
  })
  .forEach(function (file) {
    if (file.slice(-3) !== '.js') return
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize // Used for transactions and query
db.Sequelize = Sequelize // Used for DataTypes

module.exports = db