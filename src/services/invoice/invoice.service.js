const { Invoice } = require('../../models');
const { InvoiceDetail } = require('../../models');
const { Book } = require('../../models');
const { Author } = require('../../models')

const { sequelize } = require("../../models");

async function createInvoice(userId, customerId, date, paymentType, invoiceNumber) {
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

async function getAllInvoices() {
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

async function getInvoiceById(invoiceId) {
    return await Invoice.findOne({
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
        ],
        where: { id: invoiceId }
    });
}

async function deleteInvoice(invoiceId) {
    const t = await sequelize.transaction();

    try {
        // const invoiceDetails = await InvoiceDetail.findAll({
        //     where: {
        //         invoiceId: invoiceId
        //     }
        // })
        // await Promise.all(invoiceDetails.forEach(async (invoiceDetail) => {
        //     // console.log(invoiceDetail);
        //     const book = await Book.findOne({ where: { id: invoiceDetail.BookId }});

        // }));
        // for (const detail of invoiceDetails) {
        //     await Book.increment('stock', { where: { id: detail.BookId }, by: detail.quantity, transaction: t });
        // }

        await sequelize.query(`
            UPDATE books 
            JOIN invoicedetails ON books.id = invoicedetails.BookId 
            SET books.stock = books.stock + invoicedetails.quantity 
            WHERE invoicedetails.invoiceId = ${invoiceId};`
            , { transaction: t }
        );

        await Invoice.destroy({
            where: {
                id: invoiceId
            },
            transaction: t
        })

        await t.commit();
        return
    } catch (err) {
        console.log(err)
        await t.rollback();
        return err;
    }

}

async function updateInvoice(invoiceId, customerId = null, date = null, paymentType = null) {
    const t = await sequelize.transaction();
    try {
        const invoice = await Invoice.findOne({ where: { id: invoiceId } });
        if (customerId === null)
            customerId = invoice.CustomerId
        if (date === null)
            date = invoice.date
        if (paymentType === null)
            paymentType = invoice.paymentType

        const updatedInvoice = await Invoice.update(
            {
                CustomerId: customerId,
                date: date,
                paymentType: paymentType
            },
            { where: { id: invoiceId }, transaction: t }
        )
        t.commit();
        return updatedInvoice

    } catch (err) {
        t.rollback();
        return err;
    }
}

module.exports = {
    createInvoice,
    getAllInvoices,
    deleteInvoice,
    updateInvoice,
    getInvoiceById
}