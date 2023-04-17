const express = require('express');

const booksRouter = express.Router();

const  bookController = require('../../controller/book/book.controller');

booksRouter.get('/', bookController.httpGetAllBooks);
booksRouter.post('/', bookController.httpCreateBook);

module.exports = booksRouter;