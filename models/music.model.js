const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const musicSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    file: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;