const discountService = require('../../services/discount/discount.service');

async function httpCreateDiscount(req, res){
    const params = req.params.body;

    try {
        const discount = await discountService.createDiscount(params.code, params.active, params.percent, params.upTo, params.expirationDate);
        res.status(201).json({success: true, message: 'Discount Created', data: discount});
    } catch (err) {
        res.status(400).json({success: false, message: err.message});
    }
}

module.exports = {
    httpCreateDiscount,
}