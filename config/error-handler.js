import logger from './logger'
import http from './http'

export default (app) => {
  app.use(function (err, req, res, next) {
    logger.log('debug', err)
    // If error contains a code, then returns code directly as status. Else check error type
    let code = parseInt(err)

    if (code) {
      res.sendStatus(code)
    } else {
      switch(err) {
        case 'SequelizeValidationError':
          res.status(http.badRequest).send(http.badRequest)
          break;
        default:
          res.status(http.internalServerError).send(http.internalServerError)
      }
    }
  })
}

function getErrorString(req, res, err) {
  let str = 'Request (X-Request-Id: ' + res.getHeader('X-Request-Id') + '):\n'
  str += req.method + ' ' + req.url + '\n'
  for (let i = 0; i < req.rawHeaders.length; i = i + 2) {
    str += req.rawHeaders[i] + ': ' + req.rawHeaders[i+1] + '\n'
  }
  if (Object.keys(req.body).length !== 0) {
    str += '\n' + JSON.stringify(req.body) + '\n'
  }
  str += '\nError: \n' + err
  return str
}