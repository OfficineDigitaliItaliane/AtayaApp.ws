//Define a schema
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    unit_id: Number,
    video_url: String,
    audio: String,
    questions: [
        {
            body: String,
            audio: String,
            answers: [
                {
                    body: String,
                    audio: String,
                    correct: Boolean
                }
            ]
        }
    ]
})


