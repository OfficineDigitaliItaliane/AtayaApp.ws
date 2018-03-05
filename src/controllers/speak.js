/**
 * Created by giovanni on 01/03/18.
 */

import * as speakHandler from '../handlers/speak-handler'

export async function index(req, res, next){
    try {
        let rows = await speakHandler.find()
        res.send(rows)
    } catch (err) {
        return next(err.name)
    }
}

export async function findByUnitId(req, res, next){
    let unit_id = req.params.unit_id

    try {
        let rows = await speakHandler.findByUnitId(unit_id)
        res.send(rows)
    } catch (err) {
        return next(err.name)
    }
}

export async function show(req, res, next){
    try {
        let id = req.params.id

        let row = await speakHandler.findById(id)
        res.send(row)
    } catch (err) {
        return next(err.name)
    }
}

export async function create(req, res, next){
    try {
        let {body} = req

        let result = await speakHandler.create(body)
        res.status(201).json(result)
    } catch (err) {
        return next(err.name)
    }
}

export async function update(req, res, next){
    try {
        let {body} = req
        let id = req.params.id

        await speakHandler.update(id, body)
        let row = await speakHandler.findById(id)
        res.json(row)
    } catch (err) {
        return next(err.name)
    }
}

export async function destroy(req, res, next){
    try {
        let id = req.params.id

        await speakHandler.findByIdAndRemove(id)
        res.sendStatus(200)
    } catch (err) {
        return next(err.name)
    }
}