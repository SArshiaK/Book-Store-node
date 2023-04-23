const express = require('express');

const invoicedetailRouter = express.Router();

const invoicedetailController = require('../../controller/invoicedetail/invoicedetail.controller');

invoicedetailRouter.get('/', invoicedetailController.httpGetAllInvoiceDetailes);
invoicedetailRouter.post('/', invoicedetailController.httpCreateInvoiceDetail);

module.exports = invoicedetailRouter