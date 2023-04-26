const {Discount} = require('../../models');

async function createDiscount(code, active=true, percent, upTo=99999999, expirationDate=null){
    const discount = await Discount.create({
        code,
        active,
        percent,
        upTo,
        expirationDate
    })
    return discount
}

module.exports = {
    createDiscount,
}