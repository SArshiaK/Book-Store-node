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

async function deleteInvoice(invoiceId){
    
    const invoiceDetails = await InvoiceDetail.findAll({
        where: {
            invoiceId: invoiceId
        }
    })
    invoiceDetails.forEach(async (invoiceDetail) => {
        console.log(invoiceDetail);
        const book = await Book.findOne({ where: { id: invoiceDetail.BookId } });
        await book.increment('stock', {by: invoiceDetail.quantity});
    }) 

    await Invoice.destroy({
        where: {
            id: invoiceId
        }
    })
}

async function updateInvoice(invoiceId, customerId = null, date = null, paymentType=null){
    const invoice = await Invoice.findOne({where: {id: invoiceId}});
    if(customerId === null)
        customerId = invoice.CustomerId
    if(date === null)
        date = invoice.date
    if(paymentType === null)
    paymentType = invoice.paymentType

    const updatedInvoice = await Invoice.update(
        {
            CustomerId: customerId,
            date: date,
            paymentType: paymentType
        },
        {where: {id: invoiceId}}
    )
}

module.exports = {
    createInvoice,
    getAllInvoices,
    deleteInvoice,
    updateInvoice
}