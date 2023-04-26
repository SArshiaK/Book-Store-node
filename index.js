const express = require('express');
const {sequelize} = require('./src/models');
const apiRouter = require('./src/routes');
const app = express();

app.use(express.json());
app.use(apiRouter);

sequelize.sync(
  {force: true}
)
  .then( () => console.log("conncted to database") )
  .catch( (err) => console.log("connection failed", err) );

app.listen(3000, () => {
  console.log('listening on port 3000')
})