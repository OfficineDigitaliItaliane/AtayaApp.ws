import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const read = require('../controllers/read')

router.get('/', auth.authenticate(), read.index)
router.get('/unit_id/:unit_id', auth.authenticate(), read.findByUnitId)
router.get('/:id', auth.authenticate(), read.show)
router.post('/', auth.authenticate(), read.create)
router.put('/:id', auth.authenticate(), read.update)
router.delete('/:id', auth.authenticate(), read.destroy)

module.exports = router