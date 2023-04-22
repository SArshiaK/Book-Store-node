const customerService = require('../../services/customer/customer.service');

async function httpGetCustomers(req, res){
    customerName = req.query.customerName
    if(customerName){
        const customers = await customerService.getCustomers(customerName);
        return res.status(200).json({success: "true", message: "OK" ,data: customers});
    }
    try {
        const customers = await customerService.getCustomers();
        res.status(200).json({success: "true", message: "OK" ,data: customers});
      } catch (err) {
        const errMessage = err.message;
        res.status(400).json({success: "false", message: errMessage})
      } 
}

async function httpCreateCustomer(req, res){
    const params = req.body;
    try {
        const createdCustomer = await customerService.createCustomer(params.customerName, params.phoneNumber, params.address);
        res.status(201).json({success: "true", message: "Customer created", data:createdCustomer});
      } catch (err) {
        const errMessage = err.message;
        res.status(400).json({success: "false", message: errMessage});
      } 
}

async function httpDeleteCustomer(req, res){
    const name = req.body.name;

    try {
        const result = await customerService.deleteCustomer(name);
        if(result === 1)
            res.status(201).json({success: 'true' , message: "Customer deleted"});
        else
            res.status(404).json({success: 'false', message: 'Customer Not Found'});
      }
      catch(err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
      }
}

async function httpDeleteCustomerById(req, res){
    const id = req.params.id;
    
    try {
        const result = await customerService.deleteCustomerById(id);
        if(result === 1)
            res.status(201).json({success: 'true', message: "Customer deleted"});
        else
            res.status(404).json({success: 'false', message: 'Customer Not Found'});
      }
      catch(err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', message: errMessage});
      }
}

async function httpUpdateCustomer(req, res){
    const id = req.params.id;
    const name = req.body.name;

    try {
        await customerService.updateCustomer(id, name);
        res.status(201).json({success: 'true', message: "Customer updated", });
    } catch (err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', message: errMessage});
    }
}

async function httpFindCustomerById(req, res){
    const id = req.params.id;
    try {
        const customer = await customerService.findCustomerById(id);
        if(customer === null)
            res.status(404).json({success: 'false', message: 'Customer Not Found'});
        else
            res.status(200).json({success: 'true', customer});
    } catch (err) {
        const errMessage =  err.message;
        res.status(400).json({success: 'false', errMessage});
    }
}

module.exports = {
    httpGetCustomers,
    httpCreateCustomer,
    httpDeleteCustomer,
    httpDeleteCustomerById,
    httpUpdateCustomer,
    httpFindCustomerById
}
