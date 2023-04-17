const { Joi } = require('express-validation');

const signupValidation = {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
      userName: Joi.string()
        .required(),
      fullName: Joi.string()
        .required(),
    }),
  }

const loginValidation = {
  body: Joi.object({
    userName: Joi.string()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  })
}

module.exports = {
  signupValidation,
  loginValidation
}