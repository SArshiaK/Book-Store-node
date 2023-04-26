const express = require('express');

const invoicedetailRouter = express.Router();

const invoicedetailController = require('../../controller/invoicedetail/invoicedetail.controller');

invoicedetailRouter.get('/:id', invoicedetailController.httpGetInvoiceDetailesByInvoiceId);
invoicedetailRouter.post('/:id', invoicedetailController.httpCreateInvoiceDetail);
invoicedetailRouter.delete('/:id', invoicedetailController.httpDeleteInvoiceDetail);
invoicedetailRouter.patch('/:id', invoicedetailController.httpUpdateInvoiceDetail);



module.exports = invoicedetailRouter