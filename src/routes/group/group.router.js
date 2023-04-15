const express = require('express');

groupsRouter = express.Router();

const groupsController = require('../../controller/group/group.controller');

groupsRouter.get('/groups', groupsController.httpGetAllGroups);
groupsRouter.get('/groups/:id', groupsController.httpFindGroupById);
groupsRouter.post('/groups', groupsController.httpCreateGroup);
groupsRouter.delete('/groups', groupsController.httpDeleteGroup);
groupsRouter.delete('/groups/:id', groupsController.httpDeleteGroupById);
groupsRouter.patch('/groups/:id', groupsController.httpUpdateGroup);



module.exports = groupsRouter;