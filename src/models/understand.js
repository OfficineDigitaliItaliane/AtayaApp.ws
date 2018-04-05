//Define a schema
import mongoose from 'mongoose'

var understandAnswer = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: String, required: true},
    correct: {type: Boolean, required: true}
});

var understandQuestion = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: String, required: true},
    answers: {type: [understandAnswer], required: true}
});

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    video_url: {type: String, required: true},
    audio: {type: String, required: true},
    questions: {type: [understandQuestion], required: true}
}, { versionKey: false, collection: 'understand'})


