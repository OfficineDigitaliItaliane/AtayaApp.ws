import {Router} from 'express'

const router = new Router();
const speak = require('../controllers/speak')

router.get('/', speak.index)
router.get('/:id', speak.show)
router.post('/', speak.create)
router.put('/:id', speak.update)
router.delete('/:id', speak.destroy)

module.exports = router