const { Invoice } = require('../../models');
const { InvoiceDetail } = require('../../models');
const { Book } = require('../../models');
const { Author } = require('../../models');
const { Discount } = require('../../models');


const { sequelize } = require("../../models");

async function createInvoice(userId, customerId, date, paymentType, invoiceNumber, discountCode=null) {
    var discountId = null
    if(discountCode != null){
        const discount = await Discount.findOne({where: {code: discountCode}});
        if(!discount)
            throw new Error('Invalid discount code!');
        if(discount.active === false)
            throw new Error('Code is not active');
        discountId = discount.id
    }
    const t = await sequelize.transaction();
    try {
        await Discount.update(
            {active: false},
            {where: {id: discountId}, transaction: t}
        )
        const invoice = await Invoice.create({
            userId: userId,
            CustomerId: customerId,
            date: date,
            paymentType: paymentType,
            invoiceNumber: invoiceNumber,
            netPrice: 0,
            DiscountId: discountId
        }, {transaction: t})
        t.commit();
        return invoice
        
    } catch (err) {
        t.rollback();
        throw new Error(err);
    }
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
        throw new Error(err);
    }

}

async function updateInvoice(invoiceId, customerId = null, date = null, paymentType = null, DiscountId=null) {
    const t = await sequelize.transaction();
    try {
        const invoice = await Invoice.findOne({ where: { id: invoiceId } });
        if (customerId === null)
            customerId = invoice.CustomerId
        if (date === null)
            date = invoice.date
        if (paymentType === null)
            paymentType = invoice.paymentType
        if(DiscountId === null){
            DiscountId = invoice.DiscountId
        }
        else if(DiscountId === ''){
            var netPrice = invoice.netPrice
            if(invoice.DiscountId){
                const oldDiscount = await Discount.findOne({where: {id: invoice.DiscountId}, transaction: t});
                await Discount.update({active: true},{where: {id: invoice.DiscountId}, transaction: t});
                netPrice = (netPrice * 100) / (100 - oldDiscount.percent)
                DiscountId = null
            }
        }
        else if(DiscountId != null){
            var netPrice = invoice.netPrice
            if(invoice.DiscountId){
                const oldDiscount = await Discount.findOne({where: {id: invoice.DiscountId}, transaction: t});
                await Discount.update({active: true},{where: {id: invoice.DiscountId}, transaction: t});
                netPrice = (netPrice * 100) / (100 - oldDiscount.percent)
            }
            const newDiscount = await Discount.findOne({where: {id: DiscountId}, transaction: t});
            await Discount.update({active: false},{where: {id: DiscountId}, transaction: t});
            netPrice = (netPrice * (100 - newDiscount.percent)) / 100;
        }
        const updatedInvoice = await Invoice.update(
            {
                CustomerId: customerId,
                date: date,
                paymentType: paymentType,
                DiscountId: DiscountId,
                netPrice: netPrice
            },
            { where: { id: invoiceId }, transaction: t }
        )
        t.commit();
        return updatedInvoice

    } catch (err) {
        t.rollback();
        throw new Error(err);
    }
}

module.exports = {
    createInvoice,
    getAllInvoices,
    deleteInvoice,
    updateInvoice,
    getInvoiceById
}