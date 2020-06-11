//Define a schema
import mongoose from 'mongoose'
import {Media} from "./common.models"

const finalTestQuestion = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: Media, required: false},
    answers: {type: Boolean, required: true},
    picture: {type: Media, required: false},
});

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    questions: {type: [finalTestQuestion], required: true}
}, { versionKey: false, collection: 'final'})


