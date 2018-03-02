//Define a schema
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    picture: {type: String, required: true},
    audio: {type: String, required: true}
}, { versionKey: false})