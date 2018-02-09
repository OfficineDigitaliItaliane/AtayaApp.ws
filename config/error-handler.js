import logger from './logger'

export default (app) => {
  app.use(function (err, req, res, next) {
    //let errorString = getErrorString(req, res, err)
    //logger.error(errorString)
    // If error contains a code, then returns code directly as status. Else check error type
    let code = parseInt(err)
    if (code) {
      res.sendStatus(code)
    } else {
      switch(err) {
        case 'SequelizeValidationError':
          res.sendStatus(400)
          break;
        default:
            res.sendStatus(500)
      }
    }
  })
}

/** PRIVATE FUNCTIONS **/
function getErrorString(req, res, err) {
  let str = 'Request (X-Request-Id: ' + res.getHeader('X-Request-Id') + '):\n'
  str += req.method + ' ' + req.url + '\n'
  for (var i = 0; i < req.rawHeaders.length; i = i + 2) {
    str += req.rawHeaders[i] + ': ' + req.rawHeaders[i+1] + '\n'
  }
  if (Object.keys(req.body).length !== 0) {
    str += '\n' + JSON.stringify(req.body) + '\n'
  }
  str += '\nError: \n'
  str += err
  return str
}