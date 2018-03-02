import {Router} from 'express'

const router = new Router();
const write = require('../controllers/write')

router.get('/', write.index)
router.get('/:id', write.show)
router.post('/', write.create)
router.put('/:id', write.update)
router.delete('/:id', write.destroy)

module.exports = router