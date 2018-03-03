/**
 * Created by giovanni on 01/03/18.
 */
import * as env from '../../config/environments'
import path from 'path'
import mime from 'mime'
import fs from 'fs'

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

        var file = path.normalize(env['imageFolder']) + '/' + name
        var filename = path.basename(file)
        var mimetype = mime.lookup(file)
        res.setHeader('Content-Disposition', 'attachment; filename='+filename)
        res.setHeader('Content-Type', mimetype)
        res.setHeader('Content-Length', fs.statSync(file).size)
        var filestream = fs.createReadStream(file)
        filestream.pipe(res)
    } catch (err) {
        return next(err)
    }
}