import {Router} from 'express'

const router = new Router();
const understand = require('../controllers/understand')

router.get('/', understand.index)
router.get('/:id', understand.show)
router.post('/', understand.create)
router.put('/:id', understand.update)
router.delete('/:id', understand.destroy)

module.exports = router