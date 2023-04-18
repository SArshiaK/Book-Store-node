const express = require('express');

const userRouter = express.Router();

const userController = require('../../controller/user/user.controller');

userRouter.get('/', userController.httpGetAllUsers);

module.exports = userRouter;