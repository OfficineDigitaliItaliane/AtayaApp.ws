//Define a schema
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    unit_id: Number,
    picture: String,
    options: [
        {
            body: String,
            audio: String,
            correct: Boolean
        }
    ]
})
