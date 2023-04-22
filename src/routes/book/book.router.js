const express = require('express');

const booksRouter = express.Router();

const  bookController = require('../../controller/book/book.controller');

booksRouter.get('/', bookController.httpGetAllBooks);
booksRouter.post('/', bookController.httpCreateBook);
booksRouter.post('/search', bookController.httpSearchBook);
booksRouter.post('/filter', bookController.httpFilterByGroup);
booksRouter.delete('/:id', bookController.httpDeleteById);

module.exports = booksRouter;