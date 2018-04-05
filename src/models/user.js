//Define a schema
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    enabled: {type: Boolean, required: true}
}, { versionKey: false, collection: 'user'})