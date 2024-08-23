const express = require('express');
const router = express.Router();

const {
    postBooks
} = require("../controllers/books")


router.route('').post(postBooks);

module.exports = router;