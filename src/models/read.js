//Define a schema
import mongoose from 'mongoose'
import {Media} from "./common.models"

var readOption = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: Media, required: true},
    correct: {type: Boolean, required: true}
});

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    picture: {type: Media, required: true},
    options: {type: [readOption], required: true}
}, { versionKey: false, collection: 'read'})
