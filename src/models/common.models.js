//Define a schema
import mongoose from 'mongoose'

export const Media = new mongoose.Schema({
  value: {type: String, required: true},
  credits: {type: String, required: false}
}, { versionKey: false, collection: 'media'})