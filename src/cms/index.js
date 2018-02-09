import Express from 'express'

import path from 'path'
const express = Express()

express.use('/docs', Express.static(path.join(__dirname, '../../docs/')))


module.exports = express