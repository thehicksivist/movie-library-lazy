const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const movieModel = new Schema({
    title: {
        type: String
    },
    year: {
        type: String
    },
    genre: {
        type: String
    },
    watched: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Movie', movieModel);