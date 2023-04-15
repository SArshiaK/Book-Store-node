const express = require('express');

authorsRouter = express.Router();

const authorsController = require('../../controller/author/author.controller');

authorsRouter.get('/authors', authorsController.httpGetAllAuthors);
authorsRouter.get('/authors/:id', authorsController.httpFindAuthorById);
authorsRouter.post('/authors', authorsController.httpCreateAuthor);
authorsRouter.delete('/authors', authorsController.httpDeleteAuthor);
authorsRouter.delete('/authors/:id', authorsController.httpDeleteAuthorById);
authorsRouter.patch('/authors/:id', authorsController.httpUpdateAuthor);



module.exports = authorsRouter;