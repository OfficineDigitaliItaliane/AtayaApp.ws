import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const write = require('../controllers/write')

router.get('/', auth.authenticate(), write.index)
router.get('/:id', auth.authenticate(), write.show)
router.post('/', auth.authenticate(), write.create)
router.put('/:id', auth.authenticate(), write.update)
router.delete('/:id', auth.authenticate(), write.destroy)

module.exports = router