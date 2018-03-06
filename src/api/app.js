import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const book = require('../controllers/book')

router.get('/book', book.download)
router.get('/book/update/:timestamp', book.isUpdate)

module.exports = router