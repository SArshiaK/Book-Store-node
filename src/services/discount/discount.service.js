const { Discount, sequelize } = require("../../models");

async function generateCode(length) {
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join("");
}

async function createDiscount(active = true, percent, upTo = null, ExpirationDate = null) {
    const code = await generateCode(40);
    // console.log(code)
    const discount = await Discount.create({
        code: code,
        active,
        percent,
        upTo,
        ExpirationDate,
    });
    return discount;
}

async function getAllCodes(active = null) {


    const where = {};

    if (active)
        where.active = parseInt(active) === 1;

    return await Discount.findAll({ where });

}

async function deleteCode(discountId) {

    const t = await sequelize.transaction();
    try {
        const discount = await Discount.findOne({where: {id: discountId}});
        if(discount.active === false)
            throw new Error('This code is not active');

        await Discount.destroy({
            where: { id: discountId },
            transaction: t
        });
        t.commit();
    } catch (err) {
        await t.rollback();
        throw new Error(err);
    }
}

async function updateDiscount(discountId, active = null, percent = null, upTo = null, ExpirationDate = null) {
    const t = await sequelize.transaction();

    const discount = await Discount.findOne({where: {id: discountId}});
    if(discount.active === false)
        throw new Error('This code is not active');

    if (active === null)
        active = discount.active
    if (percent === null)
        percent = discount.percent
    if (upTo === null)
        upTo = discount.upTo
    if (ExpirationDate === null)
        ExpirationDate = discount.ExpirationDate


    try {
        await Discount.update(
            { active, percent, upTo, ExpirationDate },
            { where: { id: discountId }, transaction: t }
        )
        t.commit();

    } catch (err) {
        t.rollback();
        throw new Error(err)
    }

}

module.exports = {
    getAllCodes,
    createDiscount,
    deleteCode,
    updateDiscount
};
