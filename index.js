const express = require('express');
const {sequelize} = require('./src/models');

const { validate, ValidationError, Joi } = require('express-validation');

const authorsRouter = require('./src/routes/author/author.router');
const groupsRouter = require('./src/routes/group/group.router');
const userRouter = require('./src/routes/user/user.router');


const loginValidation = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    userName: Joi.string()
      .required(),
  }),
}

const app = express();

app.use(express.json());

sequelize.sync(
)
  .then( () => console.log("conncted to database") )
  .catch( (err) => console.log("connection failed", err) );


app.use('/', authorsRouter);
app.use('/', groupsRouter);
app.use('/', validate(loginValidation, {}, {}), userRouter);

app.use(function(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({success: false, message: err.details.body[0].message});
  }

  return res.status(500).json({success: false, message: err.details.body[0].message});
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})