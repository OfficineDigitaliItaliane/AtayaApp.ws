import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const book = require('../controllers/book')

router.get('/', book.download)
router.get('/create', book.createZip)
router.get('/update/:timestamp', book.isUpdate)

module.exports = router