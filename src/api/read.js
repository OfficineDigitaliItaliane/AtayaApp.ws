import {Router} from 'express'

const router = new Router();
const read = require('../controllers/read')

router.get('/', read.index)
router.get('/:id', read.show)
router.post('/', read.create)
router.put('/:id', read.update)
router.delete('/:id', read.destroy)

module.exports = router