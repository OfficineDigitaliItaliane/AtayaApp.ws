import {Router} from 'express'
import Auth from '../../config/auth'
import * as env from '../../config/environments'
import path from 'path'

const router = new Router();
const auth = new Auth()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, env['imageFolder']) // TODO Fix
    },
    filename: function (req, file, cb) {
        let removeExtension = function (filename) {
            var lastDotPosition = filename.lastIndexOf(".");
            if (lastDotPosition === -1) return filename;
            else return filename.substr(0, lastDotPosition);
        }
        cb(null, removeExtension(file.originalname) + '_' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})
const media = require('../controllers/media')

router.post('/upload', auth.authenticate(), upload.single("file"), media.upload)

module.exports = router
