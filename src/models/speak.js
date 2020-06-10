//Define a schema
import mongoose from 'mongoose'
import {Media} from "./common.models"

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    picture: {type: Media, required: true},
    audio: {type: Media, required: true}
}, { versionKey: false, collection: 'speak'})