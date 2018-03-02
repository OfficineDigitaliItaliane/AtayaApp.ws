import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const understand = require('../controllers/understand')

router.get('/', auth.authenticate(), understand.index)
router.get('/:id', auth.authenticate(), understand.show)
router.post('/', auth.authenticate(), understand.create)
router.put('/:id', auth.authenticate(), understand.update)
router.delete('/:id', auth.authenticate(), understand.destroy)

module.exports = router