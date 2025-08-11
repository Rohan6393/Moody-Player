const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title:String,
    artist:String,
    audio:String,
    mood:String
})

const songs = mongoose.model('Song',songSchema);

module.exports = songs;