const userService = require('../../services/user/user.service');

async function httpGetAllUsers(req, res){
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({success: true, message: 'OK', data: users});
    } catch (err) {
        res.status(400).json({success: false, message: err.message})
    }
}


module.exports = {
    httpGetAllUsers,
}