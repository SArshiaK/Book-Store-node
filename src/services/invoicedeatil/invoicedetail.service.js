const {InvoiceDetail} = require('../../models');
const {Book} = require('../../models')
const {Invoice} = require('../../models')

async function getAlInvoiceDetailes(){
    const invoiceDetailes = await InvoiceDetail.findAll()
    return invoiceDetailes
}

async function createInvoiceDetail(bookId, invoiceId, quantity, discount){
    const book = await Book.findOne({
        where: {
            id: bookId
        }
    })
    if(!book)
        return 'Book not found';
    if(book.stock < quantity)
        return 'The requested quantity is greater than the stock';
    const unitPrice = book.price
    const row = await InvoiceDetail.max('row', {
        where: {
            invoiceId: invoiceId
        }
    })
    console.log(row)
    const invoicedetail = await InvoiceDetail.create({
        BookId: bookId,
        invoiceId: invoiceId,
        row: row + 1,
        quantity: quantity,
        unitPrice: unitPrice,
        discount: discount
    })
    changedStock = book.stock - quantity;
    await Book.update(
        { stock: changedStock },
        { where: { id: bookId } }
      )
    const invoice = await Invoice.findOne({ where: { id: invoiceId } });
    await invoice.increment('netPrice', {by: invoicedetail.totalPrice});
    return invoicedetail
}

async function deleteInvoiceDetail(invoiceDetailId){
    
    const invoicedetail = await InvoiceDetail.findOne({
        where: {
            id: invoiceDetailId
        }
    })

    const invoice = await Invoice.findOne({ where: { id: invoicedetail.invoiceId } });
    await invoice.decrement('netPrice', {by: invoicedetail.totalPrice});

    const book = await Book.findOne({ where: { id: invoicedetail.BookId } });
    await book.increment('stock', {by: invoicedetail.quantity});
    await InvoiceDetail.destroy({
        where: {
            id: invoiceDetailId
        }
    })
}

module.exports = {
    createInvoiceDetail,
    getAlInvoiceDetailes,
    deleteInvoiceDetail
}