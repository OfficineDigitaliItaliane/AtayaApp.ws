import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
// const book = require('../controllers/book')
const bookV2 = require('../controllers/bookV2')

/*
router.get('/create', auth.authenticate(), book.createZip)
*/

router.get('/create/v2', auth.authenticate(), bookV2.createZip)

module.exports = router