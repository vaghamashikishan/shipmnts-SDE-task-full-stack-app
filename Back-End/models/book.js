const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    name: {
        type: String,
    },
    isbnCode: {
        type: String,
    },
    author: {
        type: String,
    }
}, {
    timestamps: true
});

const Books = mongoose.model('book', bookSchema);

module.exports = Books;