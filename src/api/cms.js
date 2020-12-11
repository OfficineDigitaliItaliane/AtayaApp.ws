import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const mediaApi = require('./media')
const speakApi = require('./speak')
const readApi = require('./read')
const writeApi = require('./write')
const understandApi = require('./understand')
const bookApi = require('./book')
const finalApi = require('./final')

const user = require('../controllers/users')

router.post('/login', user.login)
// router.post('/signup', user.signup)
router.use('/media', mediaApi)
router.use('/speak', speakApi)
router.use('/read', readApi)
router.use('/write', writeApi)
router.use('/understand', understandApi)
router.use('/final', finalApi)
router.use('/book', bookApi)

module.exports = router