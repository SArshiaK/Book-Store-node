const express = require('express');

const { validate, ValidationError, Joi } = require('express-validation');

const userRouter = express.Router();

const {signupValidation, loginValidation} = require('../../middleware/validation.middleware');

const { requireAuth } = require('../../middleware/auth.middleware');

const userController = require('../../controller/user/user.controller');

userRouter.post('/signup', validate(signupValidation, {keyByField: true}, {}), userController.httpSignUp);
userRouter.post('/login', validate(loginValidation, {keyByField: true}, {}), userController.httpLogin);
userRouter.get('/users', requireAuth, userController.httpGetAllUsers);

userRouter.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({success: false, message: err.details[0]});
  }

  return res.status(500).json({success: false, message: err.details[0]});

})

module.exports = userRouter;
