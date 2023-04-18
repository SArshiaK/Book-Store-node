const express = require('express');

const bookgroupController = require('../../controller/bookgroup/bookgroup.controller');

const bookgroupRouter = express.Router();

bookgroupRouter.get('/', bookgroupController.httpAllConnections);
bookgroupRouter.post('/', bookgroupController.httpAddBookToGroup);
bookgroupRouter.patch('/:id', bookgroupController.httpUpdateConnection);
bookgroupRouter.delete('/:id', bookgroupController.httpDeleteConnection);



module.exports = bookgroupRouter;