/**
 * Created by giovanni on 01/03/18.
 */
import * as env from '../../config/environments'

export async function upload(req, res, next){
    try {
        res.send({name: req.file.filename, type: req.file.mimetype})
    } catch (err) {
        return next(err)
    }
}

export async function get(req, res, next){
    try {
        let name = req.params.name

        let file = env['imageFolder'] + '/' + name
        res.download(file)
    } catch (err) {
        return next(err)
    }
}