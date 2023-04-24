const { Invoice } = require('../../models');
const { InvoiceDetail } = require('../../models');
const {Book} = require('../../models');
const {Author} = require('../../models')


async function createInvoice(userId, customerId, date, paymentType, invoiceNumber){
    const invoice = await Invoice.create({
        userId: userId,
        CustomerId: customerId,
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
                model: InvoiceDetail,
                required: false,
                include: [{
                    attributes: ['title', 'stock'],
                    model: Book,
                    required: true,
                    include: [{
                        attributes: ['id', 'authorName'],
                        model: Author,
                        required: true
                    },
                    ]
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