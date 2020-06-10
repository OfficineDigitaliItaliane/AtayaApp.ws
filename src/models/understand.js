//Define a schema
import mongoose from 'mongoose'
import {Media} from "./common.models"

var understandAnswer = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: Media, required: true},
    correct: {type: Boolean, required: true}
});

var understandQuestion = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: Media, required: true},
    answers: {type: [understandAnswer], required: true}
});

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    video_url: {type: Media, required: true},
    audio: {type: Media, required: true},
    questions: {type: [understandQuestion], required: true}
}, { versionKey: false, collection: 'understand'})


