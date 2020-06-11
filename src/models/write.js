//Define a schema
import mongoose from 'mongoose'
import {Media} from "./common.models"

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    audio: {type: Media, required: true},
    picture: {type: Media, required: true},
    word: {type: String, required: true},
    letters: [{
        type: String
    }]
}, { versionKey: false, collection: 'write'})