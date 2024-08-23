const express = require('express');
const router = express.Router();

const {
    postAuthors
} = require("../controllers/author")


router.route('').post(postAuthors);

module.exports = router;