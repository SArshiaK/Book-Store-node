const express = require('express');

const userRouter = express.Router();

const userController = require('../../controller/user/user.controller');

userRouter.post('/signup', userController.httpSignUp);
userRouter.post('/login', userController.httpLogin);


module.exports = userRouter;
