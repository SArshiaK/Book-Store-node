const express = require('express');

const groupsRouter = express.Router();

const groupsController = require('../../controller/group/group.controller');

groupsRouter.get('/', groupsController.httpGetAllGroups);
groupsRouter.get('/:id', groupsController.httpFindGroupById);
groupsRouter.post('/', groupsController.httpCreateGroup);
groupsRouter.delete('/', groupsController.httpDeleteGroup);
groupsRouter.delete('/:id', groupsController.httpDeleteGroupById);
groupsRouter.patch('/:id', groupsController.httpUpdateGroup);



module.exports = groupsRouter;