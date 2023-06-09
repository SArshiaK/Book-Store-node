const discountController = require('../../controller/discount/discount.controller');

const express = require('express');

const discountRouter = express.Router();

discountRouter.post('/', discountController.httpCreateDiscount);
discountRouter.get('/', discountController.httpGetAllCodes);
discountRouter.delete('/:id', discountController.httpDeleteDiscount);
discountRouter.patch('/:id', discountController.httpUpdateDiscount);




module.exports = discountRouter;