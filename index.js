const express = require('express');
const {sequelize} = require('./src/models');

const authorsRouter = require('./src/routes/author/author.router');
const groupsRouter = require('./src/routes/group/group.router');
const userRouter = require('./src/routes/user/user.router');


const app = express();

app.use(express.json());

sequelize.sync(
)
  .then( () => console.log("conncted to database") )
  .catch( (err) => console.log("connection failed", err) );


app.use('/', authorsRouter);
app.use('/', groupsRouter);
app.use('/', userRouter);

app.listen(3000, () => {
  console.log('listening on port 3000')
})