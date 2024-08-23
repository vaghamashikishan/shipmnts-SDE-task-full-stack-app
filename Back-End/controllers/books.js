const Book = require("../models/book");

const postBooks = async (req, res) => {
    try {
        const books = req.body.books;
        await Book.insertMany(books);
        res.status(201).json({ message: `new book(s) added successfully.` });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'An error occurred while adding books.', error });
    }
};

module.exports = {
    postBooks
}