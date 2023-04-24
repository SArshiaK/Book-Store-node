const express = require('express');

const invoiceRouter = express.Router();

const invoiceController = require('../../controller/invoice/invoice.controller');

invoiceRouter.get('/', invoiceController.httpGetAllInvoices);
invoiceRouter.post('/', invoiceController.httpCreateInvoice);
invoiceRouter.delete('/:id', invoiceController.httpDeleteInvoice);
invoiceRouter.patch('/:id', invoiceController.httpUpdateInvoice);


module.exports = invoiceRouter