/**
 * Created by giovanni on 01/03/18.
 */

import * as writeHandler from '../handlers/write-handler'

export async function index(req, res, next){
    try {
        let rows = await writeHandler.find()
        res.send(rows)
    } catch (err) {
        return next(err.name)
    }
}

export async function show(req, res, next){
    try {
        let id = req.params.id

        let row = await writeHandler.findById(id)
        res.send(row)
    } catch (err) {
        return next(err.name)
    }
}

export async function create(req, res, next){
    try {
        let {body} = req

        await writeHandler.create(body)
        res.sendStatus(201)
    } catch (err) {
        return next(err.name)
    }
}

export async function update(req, res, next){
    try {
        let {body} = req
        let id = req.params.id

        await writeHandler.update(id, body)
        res.sendStatus(200)
    } catch (err) {
        return next(err.name)
    }
}

export async function destroy(req, res, next){
    try {
        let id = req.params.id

        await writeHandler.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (err) {
        return next(err.name)
    }
}