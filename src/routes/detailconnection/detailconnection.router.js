const express = require('express');

const detailConnectionRouter = express.Router();

const detailConnectionController = require('../../controller/detailconnection/detailconnection.controller');

detailConnectionRouter.get('/', detailConnectionController.httpGetAllConnections);
detailConnectionRouter.post('/', detailConnectionController.httpCreateConnection);

module.exports = detailConnectionRouter