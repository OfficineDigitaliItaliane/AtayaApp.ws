import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const speak = require('../controllers/speak')

router.get('/', auth.authenticate(), speak.index)
router.get('/unit_id/:unit_id', auth.authenticate(), speak.findByUnitId)
router.get('/:id', auth.authenticate(), speak.show)
router.post('/', auth.authenticate(), speak.create)
router.put('/:id', auth.authenticate(), speak.update)
router.delete('/:id', auth.authenticate(), speak.destroy)

module.exports = router