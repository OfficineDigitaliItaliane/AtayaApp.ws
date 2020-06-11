import {Router} from 'express'
import config from '../../config/environments'

const router = new Router();
const book = require('../controllers/book')
const bookV2 = require('../controllers/bookV2')

function apiKey(req, res, next) {
  let {headers} = req;

  let apiKey = headers['x-api-key']
  if (apiKey != config['apiKey']) {
      let error = new Error()
      error.code = 401
      next(error);
      return;
  }
  next();
}


router.get('/book',apiKey, book.download)
router.get('/book/update/:timestamp', apiKey, book.isUpdate)

//V2
router.get('/book/v2',apiKey, bookV2.download)
router.get('/book/v2/update/:timestamp',apiKey, bookV2.isUpdate)

module.exports = router