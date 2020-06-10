/**
 * Created by giovanni on 01/03/18.
 */

import * as bookHandler from '../handlers/book-handler'
import * as env from '../../config/environments'

export async function download(req, res, next){
    try {
        let filePath = bookHandler.getZipFilePath(env['bookFolderV2'])
        res.download(filePath)
    } catch (err) {
        return next(err)
    }
}

export async function createZip(req, res, next){
    try {
        await bookHandler.createZip(env['bookFolderV2'], env['imageFolder'])
        res.sendStatus(200)
    } catch (err) {
        return next(err)
    }
}

export async function isUpdate(req, res, next){
    try{
        let timestamp = req.params.timestamp
        let bookTimestamp = await bookHandler.getBookTimestamp(env['bookFolderV2'])

        let result = (bookTimestamp > timestamp)
        return res.status(200).send(result).end()
    }catch(err){
        return next(err)
    }
}