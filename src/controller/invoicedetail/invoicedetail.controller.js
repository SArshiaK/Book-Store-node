const invoiceService = require('../../services/invoicedeatil/invoicedetail.service');

async function httpGetAllInvoiceDetailes(req, res){
    try {
        const invoiceDetailes = await invoiceService.getAlInvoiceDetailes()
        return res.status(200).json({success: true, message: 'OK', data: invoiceDetailes});
    } catch (err) {
        res.status(400).json({success: false, message: err})
    }
}

async function httpCreateInvoiceDetail(req, res){
    const params  = req.body
    if(!params.discount)
        params.discount = 0
    console.log(params.discount)
    try {
        const invoiceDetail = await invoiceService.createInvoiceDetail(params.bookId, params.row, params.quantity, params.discount);
        if(invoiceDetail === 'The requested quantity is greater than the stock')
            return res.status(400).json({success: false, message: 'The requested quantity is greater than the stock'});
        else if(invoiceDetail === 'Book not found')
            return res.status(404).json({success: false, message: 'Book not found'})
        return res.status(201).json({success: true, message: 'invoice detail created', data: invoiceDetail});
    } catch (err) {
        res.status(400).json({success: false, message: err});
    }
}

module.exports = {
    httpGetAllInvoiceDetailes,
    httpCreateInvoiceDetail
}