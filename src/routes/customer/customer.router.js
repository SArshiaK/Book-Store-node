const express = require('express');

const customersRouter = express.Router();

const customerController = require('../../controller/customer/customer.controller');

const { validate, ValidationError, Joi } = require('express-validation');
const {createCustomerValidation} = require('../../middleware/validation.middleware')


customersRouter.get('/', customerController.httpGetCustomers);
customersRouter.get('/:id', customerController.httpFindCustomerById);
customersRouter.post('/', validate(createCustomerValidation, {keyByField: true}, {}), customerController.httpCreateCustomer);
customersRouter.delete('/', customerController.httpDeleteCustomer);
customersRouter.delete('/:id', customerController.httpDeleteCustomerById);
customersRouter.patch('/:id', customerController.httpUpdateCustomer);

customersRouter.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({success: false, message: err.details[0]});
    }
  
    return res.status(500).json({success: false, message: err.details[0]});
  
  })

module.exports = customersRouter;