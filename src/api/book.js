import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const book = require('../controllers/book')

router.get('/create', auth.authenticate(), book.createZip)

module.exports = router