import {Router} from 'express'

const router = new Router();
const mock = require('../controllers/mock')

router.get('/book', mock.getBook)

module.exports = router