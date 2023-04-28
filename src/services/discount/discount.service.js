const { Discount, sequelize, Invoice } = require("../../models");

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
    if (active === null || active === undefined) return await Discount.findAll();
    else if (active === "false") {
        return await Discount.findAll({ where: { active: 0 } });
    } else return await Discount.findAll({ where: { active: 1 } });
}

async function deleteCode(discountId) {
    const percent_id_netprice = await sequelize.query(
        `
        SELECT 
            discounts.percent,
            invoices.id,
            invoices.netPrice
        FROM discounts
        JOIN invoices
        ON discounts.id = invoices.DiscountId
        WHERE discounts.id = ${discountId}
    `
    );
    const t = await sequelize.transaction();
    try {
        if (percent_id_netprice) {
            const percent = percent_id_netprice[0][0].percent;
            const invoiceId = percent_id_netprice[0][0].id;
            var netPrice = percent_id_netprice[0][0].netPrice;
            console.log(netPrice);
            netPrice = (netPrice * 100) / (100 - percent);
            console.log(netPrice);

            await Invoice.update(
                {
                    DiscountId: null,
                    netPrice: netPrice,
                },

                { where: { id: invoiceId }, transaction: t }
            );
            await Discount.destroy({
                where: { id: discountId },
                transaction: t
            });
        }
        t.commit();
    } catch (err) {
        await t.rollback();
        throw new Error(err)
    }
}

module.exports = {
    getAllCodes,
    createDiscount,
    deleteCode,
};
