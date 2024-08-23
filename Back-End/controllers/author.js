const Author = require("../models/author");

const postAuthors = async (req, res) => {
    try {
        const authors = req.body.authors;
        await Author.insertMany(authors);
        res.status(201).json({ message: `new author(s) added successfully.` });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'An error occurred while adding authors.', error });
    }
};

module.exports = {
    postAuthors
}