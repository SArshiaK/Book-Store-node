const { Invoice } = require('../../models');
const { IdetailConnector } = require('../../models');
const { InvoiceDetail } = require('../../models');


async function createInvoice(userId, date, paymentType, invoiceNumber){
    const invoice = await Invoice.create({
        userId: userId,
        date: date,
        paymentType: paymentType,
        invoiceNumber: invoiceNumber,
        netPrice: 0
    }) 
    return invoice
}

async function getAllInvoices(){
    const invoices = await Invoice.findAll({
        include: [
            {
                model: IdetailConnector,
                attributes: ['id'],
                as: 'connections',
                required: false,
                include: [{
                    attributes: ['id', 'bookId', 'quantity', 'unitPrice', 'discount', 'totalPrice'],
                    model: InvoiceDetail,
                    required: true
                },
                ]
            },
        ]
    });
    return invoices
}

module.exports = {
    createInvoice,
    getAllInvoices
}