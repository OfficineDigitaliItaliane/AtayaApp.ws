import {Router} from 'express'
import Auth from '../../config/auth'

const router = new Router();
const auth = new Auth()
const final = require('../controllers/final')

router.get('/', auth.authenticate(), final.index)
router.get('/unit_id/:unit_id', auth.authenticate(), final.findByUnitId)
router.get('/:id', auth.authenticate(), final.show)
router.post('/', auth.authenticate(), final.create)
router.put('/:id', auth.authenticate(), final.update)
router.delete('/:id', auth.authenticate(), final.destroy)

module.exports = router