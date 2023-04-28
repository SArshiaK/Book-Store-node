const {Discount} = require('../../models');

async function generateCode(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

async function createDiscount(active=true, percent, upTo=null, ExpirationDate=null){
    const code = await generateCode(40); 
    // console.log(code)
    const discount = await Discount.create({
        code: code,
        active,
        percent,
        upTo,
        ExpirationDate
    })
    return discount
}

async function getAllCodes(active=null){
    if(active === null || active === undefined)
        return await Discount.findAll()
    else if (active === 'false'){
        return await Discount.findAll({where: {active: 0}})
    }
    else return await Discount.findAll({where:{active: 1}})
}

module.exports = {
    getAllCodes,
    createDiscount,
}