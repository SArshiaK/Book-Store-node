const {IdetailConnector} = require('../../models');
const {Invoice} = require('../../models');
const {InvoiceDetail} = require('../../models');

async function createConnection(invoiceId, detailId){
    const idconnection = await IdetailConnector.create({
        invoiceId: invoiceId,
        detailId: detailId
    })
    const invoicedetail = await InvoiceDetail.findOne({ where: {id: detailId }});
    const invoice = await Invoice.findOne({ where: { id: invoiceId } });
    console.log(invoicedetail.totalPrice)
    await invoice.increment('netPrice', {by: invoicedetail.totalPrice});
    return idconnection
}

async function getAllConnections(){
    const connections = await IdetailConnector.findAll();
    return connections
}

module.exports = {
    createConnection,
    getAllConnections
}