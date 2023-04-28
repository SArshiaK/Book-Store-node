const discountController = require('../../controller/discount/discount.controller');

const express = require('express');

const discountRouter = express.Router();

discountRouter.post('/', discountController.httpCreateDiscount);
discountRouter.get('/', discountController.httpGetAllCodes);


module.exports = discountRouter;