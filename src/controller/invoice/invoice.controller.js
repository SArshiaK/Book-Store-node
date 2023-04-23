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

async function httpCreateInvoice(req, res){
    const user = req.User;
    const params = req.body;

    let persiandate = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    try {
        const invoice = await invoiceService.createInvoice(user.id, persiandate, params.paymentType, params.invoiceNumber);
        return res.status(201).json({success: true, message: 'Invoice created', data: invoice});
    } catch (err) {
        res.status(400).json({success: false, message: err})
    }
}

module.exports = {
    httpCreateInvoice,
    httpGetAllInvoices
}