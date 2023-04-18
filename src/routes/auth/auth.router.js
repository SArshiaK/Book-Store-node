const express = require('express');

const { validate, ValidationError, Joi } = require('express-validation');

const authRouter = express.Router();

const {signupValidation, loginValidation} = require('../../middleware/validation.middleware');


const userController = require('../../controller/auth/auth.controller');

authRouter.post('/signup', validate(signupValidation, {keyByField: true}, {}), userController.httpSignUp);
authRouter.post('/login', validate(loginValidation, {keyByField: true}, {}), userController.httpLogin);

authRouter.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({success: false, message: err.details[0]});
  }

  return res.status(500).json({success: false, message: err.details[0]});

})

module.exports = authRouter;
