import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()

const user = require('../controllers/users')

router.post('/login', user.login)
router.post('/signup', user.signup)
router.get('/stub',auth.authenticate(), user.stub)

module.exports = router