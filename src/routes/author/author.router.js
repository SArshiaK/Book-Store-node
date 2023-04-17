const express = require('express');

const authorsRouter = express.Router();

const authorsController = require('../../controller/author/author.controller');


authorsRouter.get('/', authorsController.httpGetAllAuthors);
authorsRouter.get('/:id', authorsController.httpFindAuthorById);
authorsRouter.post('/' , authorsController.httpCreateAuthor);
authorsRouter.delete('/', authorsController.httpDeleteAuthor);
authorsRouter.delete('/:id', authorsController.httpDeleteAuthorById);
authorsRouter.patch('/:id', authorsController.httpUpdateAuthor);



module.exports = authorsRouter;