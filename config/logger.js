'use strict'

import winston from 'winston'
import path from 'path'
import fs from 'fs'
import winstonDailyRotate from 'winston-daily-rotate-file'

const env = process.env.NODE_ENV
const tsFormat = () => (new Date()).toLocaleTimeString()
const logDir = path.join(__dirname + '/../logs')
winston.emitErrs = true

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logger = new (winston.Logger)({
  transports: [
    new winstonDailyRotate ({
      level: 'info',
      prepend: true,
      filename: path.join(logDir, 'queryPerf.log'),
      handleExceptions: false,
      json: false,
      timestamp: tsFormat
    }),
    new (winston.transports.File)({
      level: 'development' === env ? 'silly' : 'info',
      filename: path.join(logDir, 'messages.log'),
      handleExceptions: true,
      timestamp: tsFormat,
      json: true,
      datePattern: 'yyyy-MM-dd',
      prepend: true
    }),
    new winston.transports.Console ({
      level: 'development' === env ? 'silly' : 'info',
      handleExceptions: true,
      json: false,
      timestamp: tsFormat,
      colorize: true
    })
  ],
  exitOnError: false
})

logger.stream = {
  write: (message, encoding) => {
    logger.silly(message)
  }
}

export default logger