/**
 * Created by giovanni on 01/03/18.
 */

import * as bookHandler from '../handlers/book-handler'
import * as env from '../../config/environments'

function apiKeyValidation(headers) {
    let apiKey = headers['x-api-key']
    if (apiKey != env['apiKey']) {
        let error = new Error()
        error.code = 401
        throw error
    }
}

export async function download(req, res, next){
    try {
        let {headers} = req
        apiKeyValidation(headers)

        let filePath = bookHandler.getZipFilePath()
        res.download(filePath)
    } catch (err) {
        return next(err)
    }
}

export async function createZip(req, res, next){
    try {
        await bookHandler.createZip()
        res.sendStatus(200)
    } catch (err) {
        return next(err)
    }
}

export async function isUpdate(req, res, next){
    try{
        let {headers} = req
        apiKeyValidation(headers)

        let timestamp = req.params.timestamp
        let bookTimestamp = await bookHandler.getBookTimestamp()

        let result = (bookTimestamp > timestamp)
        return res.status(200).send(result).end()
    }catch(err){
        return next(err)
    }
}