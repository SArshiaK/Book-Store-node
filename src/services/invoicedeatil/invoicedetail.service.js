const { InvoiceDetail, Book, Invoice, Discount, sequelize } = require('../../models');

async function getInvoiceDetailesByInvoiceId(invoiceId) {
    const invoiceDetailes = await InvoiceDetail.findAll({ where: { invoiceId } })
    return invoiceDetailes
}

async function calculateNetprice(invoiceId, t) {
    const total = await InvoiceDetail.sum('totalPrice', { where: { invoiceId: invoiceId }, transaction: t });
    const invoice = await Invoice.findOne({
        attributes: [],
        include: [{
            model: Discount,
            attributes: ['percent', 'upTo']
        }],
        where: {
            id: invoiceId
        },
        transaction: t
    })
    console.log(invoice.dataValues.Discount.dataValues)

    const percent = invoice.dataValues.Discount.dataValues.percent;
    const upTo = invoice.dataValues.Discount.upTo

    const netPrice = (total * (100 - percent)) / 100;

    if(upTo && total - netPrice > upTo){
        console.log(total - netPrice)
        throw new Error('Discount is over the limit')
    }


    await Invoice.update(
        { netPrice: netPrice },
        { where: { id: invoiceId }, transaction: t }
    )


}

async function createInvoiceDetail(bookId, invoiceId, quantity, discount) {
    const t = await sequelize.transaction();

    const book = await Book.findOne({
        where: {
            id: bookId
        }
    })
    if (!book)
        return 'Book not found';
    if (book.stock < quantity)
        return 'The requested quantity is greater than the stock';

    try {
        const unitPrice = book.price
        const row = await InvoiceDetail.max('row', {
            where: { invoiceId }
        })
        const invoicedetail = await InvoiceDetail.create({
            BookId: bookId,
            invoiceId,
            row: row + 1,
            quantity,
            unitPrice,
            discount
        }, { transaction: t })

        changedStock = book.stock - quantity;
        await Book.update(
            { stock: changedStock },
            { where: { id: bookId }, transaction: t }
        )

        await calculateNetprice(invoiceId, t);

        await t.commit();


        return invoicedetail;

    } catch (err) {
        // console.log(err);
        await t.rollback();
        throw new Error(err);
    }
}

async function deleteInvoiceDetail(invoiceDetailId) {
    const t = await sequelize.transaction();

    try {

        const invoicedetail = await InvoiceDetail.findOne({
            where: {
                id: invoiceDetailId
            }
        })


        await Book.increment('stock', { where: { id: invoicedetail.BookId }, by: invoicedetail.quantity, transaction: t });

        await InvoiceDetail.destroy({
            where: {
                id: invoiceDetailId
            },
            transaction: t
        })
        const invoiceDetails = await InvoiceDetail.findAll({ where: { invoiceId: invoicedetail.invoiceId }, transaction: t });

        for (var i = 0; i < invoiceDetails.length; i++) {
            await InvoiceDetail.update({
                row: i + 1
            },
                {
                    where: { id: invoiceDetails[i].id },
                    transaction: t
                })
        }
        await calculateNetprice(invoicedetail.invoiceId, t);

        await t.commit();
    } catch (err) {
        await t.rollback();
        throw new Error(err)
    }

}

async function updateInvoiceDetail(invoiceDetailId, bookId = null, invoiceId = null, quantity = null, discount = null) {
    const invoiceDetail = await InvoiceDetail.findOne({ where: { id: invoiceDetailId } });

    if (bookId === null)
        bookId = invoiceDetail.BookId;
    if (invoiceId === null)
        invoiceId = invoiceDetail.invoiceId;
    if (quantity === null)
        quantity = invoiceDetail.quantity
    if (discount === null)
        discount = invoiceDetail.discount

    const newInvoicedetail = await createInvoiceDetail(bookId, invoiceId, quantity, discount);
    await deleteInvoiceDetail(invoiceDetailId);
    return newInvoicedetail;
}

module.exports = {
    createInvoiceDetail,
    getInvoiceDetailesByInvoiceId,
    deleteInvoiceDetail,
    updateInvoiceDetail
}