//Define a schema
import mongoose from 'mongoose'
import {Media} from "./common.models"

var Marker =  new mongoose.Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    id: {type: String, required: true}
},{_id: false});

var readOption = new mongoose.Schema({
    body: {type: String, required: true},
    audio: {type: Media, required: true},
    markerId: {type: String, required: true}
});

module.exports = new mongoose.Schema({
    unit_id: {type: Number, required: true},
    title: {type: String, required: true},
    picture: {type: Media, required: true},
    options: {type: [readOption], required: true},
    markers: {type: [Marker], required: true}
}, { versionKey: false, collection: 'read'})
