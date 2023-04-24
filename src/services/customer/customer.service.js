const { Customer } = require("../../models");
const {Invoice} = require('../../models');
const{InvoiceDetail} = require('../../models')

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

async function getCustomers(customerName = null) {
    if (customerName != null) {
        const customers = Customer.findAll({
            include: [
                {   
                    model: Invoice,
                    as: 'invoices',
                    required: false,
                    include: [{
                        model: InvoiceDetail,
                        required: true,
                    },
                    ]
                },
            ],
            where: {
                customerName: {
                    [Op.like]: `%${customerName}%`,
                }
            }
        })
        return customers
    }
    else{
        return Customer.findAll({
            include: [
                {   
                    model: Invoice,
                    as: 'invoices',
                    required: false,
                    include: [{
                        model: InvoiceDetail,
                        required: true,
                    },
                    ]
                },
            ],
        });
    }
}

async function createCustomer(userId, customerName, phoneNumber, address) {
    const customer = await Customer.create({UserId:userId, customerName, phoneNumber, address });
    return customer.dataValues;
}

async function deleteCustomer(name) {
    const result = await Customer.destroy({
        where: {
            customerName: name,
        },
    });
    return result;
}

async function deleteCustomerById(id) {
    const result = await Customer.destroy({
        where: {
            id: id,
        },
    });
    return result;
}

async function updateCustomer(id, name) {
    await Customer.update({ customerName: name }, { where: { id: id } });
}

async function findCustomerById(id) {
    const customer = await Customer.findOne({ where: { id: id } });
    return customer;
}

module.exports = {
    getCustomers,
    createCustomer,
    deleteCustomer,
    deleteCustomerById,
    updateCustomer,
    findCustomerById,
};
