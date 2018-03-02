/**
 * Created by giovanni on 01/03/18.
 */

export async function upload(req, res, next){
    try {
        res.send({name: req.file.filename, type: req.file.mimetype})
    } catch (err) {
        return next(err)
    }
}