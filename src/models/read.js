//Define a schema
import mongoose from 'mongoose'

var readOption = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: String, required: true},
    correct: {type: Boolean, required: true}
});

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    picture: {type: String, required: true},
    options: {type: [readOption], required: true}
}, { versionKey: false, collection: 'read'})
