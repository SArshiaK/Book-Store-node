const bookgroupService = require('../../services/bookgroup/bookgroup.service');

async function httpAllConnections(req, res){
    const connections = await bookgroupService.allConnections();
    res.status(200).json({success: true, message: 'OK', data: connections})
}

async function httpAddBookToGroup(req, res){
    const bookId = req.body.bookId;
    const groupId = req.body.groupId;

    try {
        const {connection, message} = await bookgroupService.addBookTOGroup(bookId, groupId);
        if(message === 'already exist'){
            return res.status(403).json({success: false, message: message});
        }
        res.status(201).json({success: true, message: 'book added to group', data: connection});
    } catch (err) {
        res.status(400).json({success: false, message: 'عملیات با خطا مواجه شد'});
    }
}

async function httpUpdateConnection(req, res){
    const connectionId = req.params.id;
    const bookId = req.body.bookId;
    const groupId = req.body.groupId;

    try {
        const {connection, message} = await bookgroupService.updateConnection(connectionId, bookId, groupId);
        if(message === 'simmillar conection already exist'){
            return res.status(403).json({success: false, message: message});
        }
        if(message === 'Not Found'){
            return res.status(404).json({success: false, message: 'Not Found'});
        }
        res.status(200).json({success: true, message: 'connection updated', data: connection});
        
    } catch (err) {
        res.status(400).json({success: false, message: 'عملیات با خطا مواجه شد'});
    }
}

async function httpDeleteConnection(req, res){
    const connectionId = req.params.id;
    try {
        const result = await bookgroupService.deleteConnection(connectionId);
        if(result === 1)
            return res.status(201).json({success: 'true', message: "Connection deleted"});
        
        res.status(404).json({success: 'false', message: 'Connection Not Found'});
        
    } catch (err) {
        res.status(400).json({success: 'false', message: 'عملیات با خطا مواجه شد'});
    }
}



module.exports = {
    httpAddBookToGroup,
    httpAllConnections,
    httpUpdateConnection,
    httpDeleteConnection
}