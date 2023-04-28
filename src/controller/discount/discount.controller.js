const discountService = require('../../services/discount/discount.service');

async function httpCreateDiscount(req, res){
    const params = req.body;
    // console.log(params)

    try {
        const discount = await discountService.createDiscount(params.active, params.percent, params.upTo, params.expirationDate);
        res.status(201).json({success: true, message: 'Discount Created', data: discount});
    } catch (err) {
        res.status(400).json({success: false, message: err.message});
    }
}

async function httpGetAllCodes(req, res){
    active = req.query.active

    try {
        const discounts = await discountService.getAllCodes(active);
        res.status(200).json({success: true, message: 'OK', data: discounts});
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, message: err.message});
    }
}

async function httpDeleteDiscount(req, res){
    const discountId = req.params.id
    try {
        await discountService.deleteCode(discountId);
        res.status(200).json({success: true, message: 'Discount Deleted'});
        
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false, message: err.message});
        
    }
}

module.exports = {
    httpCreateDiscount,
    httpGetAllCodes,
    httpDeleteDiscount,
}