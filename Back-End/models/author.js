const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
    }
}, {
    timestamps: true
});

const Author = mongoose.model('author', authorSchema);

module.exports = Author;