//Define a schema
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    picture: {type: String, required: true},
    word: {type: String, required: true},
    letters: [{
        type: String
    }]
}, { versionKey: false})