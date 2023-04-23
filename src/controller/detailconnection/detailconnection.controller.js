const detailconnectionService = require('../../services/detailconnection/detailconnection.service.js');

async function httpCreateConnection(req, res){
    const params = req.body
    try {
        const connection = await detailconnectionService.createConnection(params.invoiceId, params.detailId);
        return res.status(201).json({success: true, message: 'OK', data: connection});
    } catch (err) {
        return res.status(400).json({success: false, message: err});
    }
}

async function httpGetAllConnections(req, res){
    try {
        const connections = await detailconnectionService.getAllConnections();
        res.status(200).json({success: true, message: 'OK', data: connections});
    } catch (err) {
        res.status(400).json({success: false, message: err});
    }
}

module.exports = {
    httpCreateConnection,
    httpGetAllConnections
}