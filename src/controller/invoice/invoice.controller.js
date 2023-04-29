const invoiceService = require('../../services/invoice/invoice.service');
const persianDate = require('persian-date');
// const PersianDate = require('@alireza-ab/persian-date')
const { compareAsc, format, newDate } = require('date-fns-jalali')

async function httpGetAllInvoices(req, res){
    try {
        const invoices = await invoiceService.getAllInvoices()
        return res.status(200).json({success: true, message: 'OK', data: invoices});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, message: err})
    }
}

async function httpGetInvoiceById(req, res){
    const invoiceId = req.params.id;
    console.log(invoiceId)

    try {
        const invoice = await invoiceService.getInvoiceById(invoiceId); 
        res.status(200).json({success: true, message: 'OK', data: invoice});
    } catch (err) {
        console.log(err)

        res.status(400).json({success: false, message: err.message});
    }
}

async function httpCreateInvoice(req, res){
    const user = req.User;
    const params = req.body;
    const invoiceNumber = Math.floor(Math.random() * 10000);

    let persiandate = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    try {
        const invoice = await invoiceService.createInvoice(user.id, params.customerId, persiandate, params.paymentType, invoiceNumber, params.discountCode);
        return res.status(201).json({success: true, message: 'Invoice created', data: invoice});
    } catch (err) {
        // console.log(err)
        res.status(400).json({success: false, message: err.message})
    }
}

async function httpDeleteInvoice(req, res){
    const invoiceId = req.params.id;
    try {
        await invoiceService.deleteInvoice(invoiceId);
        res.status(201).json({success: true, message: 'Invoice Deleted'})
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, message: err.message});
    }
}

async function httpUpdateInvoice(req, res){
    const invoiceId = req.params.id
    const params = req.body
    try {
        const updatedInvoice = await invoiceService.updateInvoice(invoiceId, params.customerId, params.date, params.paymentType);
        res.status(201).json({success: true, message: 'Invoice Updated'})
    } catch (err) {
        res.status(400).json({success: true, message: err.message})
    }
}

module.exports = {
    httpCreateInvoice,
    httpGetInvoiceById,
    httpGetAllInvoices,
    httpDeleteInvoice,
    httpUpdateInvoice
}