require('express-async-errors');

const express = require('express');
const app = express();
const cors = require('cors');
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// routes import
const authorRouter = require('./routes/author');
const booksRouter = require('./routes/books');

const port = 5000;
const connectToDB = require('./db/connect');

app.use(express.json());
app.use(cors());

app.use('/authors', authorRouter);
app.use('/books', booksRouter);

// To handle errors
app.use(errorHandlerMiddleware);

// server initialization
const MONGO_URI = "mongodb+srv://kishan_vaghamashi:aMohvGImkLNZOe3v@projecteam.g1pc9f5.mongodb.net/projecTeam?retryWrites=true&w=majority&appName=projecTeam";
const start = async () => {
    try {
        await connectToDB(MONGO_URI);
        app.listen(port, () => {
            console.log("Server is listening & DB is connected..");
        });
    } catch (error) {
        console.log(error);
    }
}

start();