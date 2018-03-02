//Define a schema
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    unit_id: Number,
    picture: String,
    word: String,
    letters: [{
        type: String
    }]
}, { versionKey: false})