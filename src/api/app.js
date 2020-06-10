import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const book = require('../controllers/book')
const bookV2 = require('../controllers/bookV2')

router.get('/book', book.download)
router.get('/book/update/:timestamp', book.isUpdate)

//V2
router.get('/book/v2', bookV2.download)
router.get('/book/v2/update/:timestamp', bookV2.isUpdate)

module.exports = router