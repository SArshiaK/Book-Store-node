const invoiceDetailService = require('../../services/invoicedeatil/invoicedetail.service');

async function httpGetInvoiceDetailesByInvoiceId(req, res){
    const invoiceId= req.params.id
    try {
        const invoiceDetailes = await invoiceDetailService.getInvoiceDetailesByInvoiceId(invoiceId)
        return res.status(200).json({success: true, message: 'OK', data: invoiceDetailes});
    } catch (err) {
        res.status(400).json({success: false, message: err})
    }
}

async function httpCreateInvoiceDetail(req, res){
    const invoiceId= req.params.id
    const params  = req.body
    if(!params.discount)
        params.discount = 0
    // console.log(params.discount)
    try {
        const invoiceDetail = await invoiceDetailService.createInvoiceDetail(params.bookId, invoiceId, params.quantity, params.discount);
        if(invoiceDetail === 'The requested quantity is greater than the stock')
            return res.status(400).json({success: false, message: 'The requested quantity is greater than the stock'});
        else if(invoiceDetail === 'Book not found')
            return res.status(404).json({success: false, message: 'Book not found'})
        return res.status(201).json({success: true, message: 'invoice detail created', data: invoiceDetail});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, message: err});
    }
}

async function httpDeleteInvoiceDetail(req, res){
    const invoiceDetailId = req.params.id

    try {
        await invoiceDetailService.deleteInvoiceDetail(invoiceDetailId);
        res.status(201).json({success: true, message: 'Invoice detail deleted'});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, message: err})
    }
}

async function httpUpdateInvoiceDetail(req, res){
    const invoiceDetailId = req.params.id
    const params = req.body

    try {
        const updatedInvoiceDetail = await invoiceDetailService.updateInvoiceDetail(invoiceDetailId, params.bookId, params.invoiceId, params.quantity, params.discount);
        res.status(201).json({success: true, message: "Invoice Detail Updated", data: updatedInvoiceDetail});
    } catch (err) {
        console.log(err);
        res.status(400).json({success: false, message: err.message});
    }
}

module.exports = {
    httpGetInvoiceDetailesByInvoiceId,
    httpCreateInvoiceDetail,
    httpDeleteInvoiceDetail,
    httpUpdateInvoiceDetail
}