const {InvoiceDetail} = require('../../models');
const {Book} = require('../../models')

async function getAlInvoiceDetailes(){
    const invoiceDetailes = await InvoiceDetail.findAll()
    return invoiceDetailes
}

async function createInvoiceDetail(bookId, row, quantity, discount){
    const book = await Book.findOne({
        where: {
            id: bookId
        }
    })
    if(!book)
        return 'Book not found';
    if(book.stock < quantity)
        return 'The requested quantity is greater than the stock';
    unitPrice = book.price
    const invoicedetail = await InvoiceDetail.create({
        bookId: bookId,
        row: row,
        quantity: quantity,
        unitPrice: unitPrice,
        discount: discount
    })
    changedStock = book.stock - quantity;
    await Book.update(
        { stock: changedStock },
        { where: { id: bookId } }
      )
    return invoicedetail
}

module.exports = {
    createInvoiceDetail,
    getAlInvoiceDetailes
}