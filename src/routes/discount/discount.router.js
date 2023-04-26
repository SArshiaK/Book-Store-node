const discountController = require('../../controller/discount/discount.controller');

const express = require('express');

const discountRouter = express.Router();

discountRouter.post('/', discountController.httpCreateDiscount);

module.exports = discountRouter;