/**
 * Created by giovanni on 01/03/18.
 */

import * as readHandler from '../handlers/read-handler'

export async function index(req, res, next){
    try {
        let rows = await readHandler.find()
        res.send(rows)
    } catch (err) {
        return next(err)
    }
}

export async function findByUnitId(req, res, next){
    let unit_id = req.params.unit_id

    try {
        let rows = await readHandler.findByUnitId(unit_id)
        res.send(rows)
    } catch (err) {
        return next(err)
    }
}

export async function show(req, res, next){
    try {
        let id = req.params.id

        let row = await readHandler.findById(id)
        res.send(row)
    } catch (err) {
        return next(err)
    }
}

export async function create(req, res, next){
    try {
        let {body} = req

        let result = await readHandler.create(body)
        res.status(201).json(result)
    } catch (err) {
        return next(err)
    }
}

export async function update(req, res, next){
    try {
        let {body} = req
        let id = req.params.id

        await readHandler.update(id, body)
        let row = await readHandler.findById(id)
        res.json(row)
    } catch (err) {
        return next(err)
    }
}

export async function destroy(req, res, next){
    try {
        let id = req.params.id

        await readHandler.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (err) {
        return next(err)
    }
}