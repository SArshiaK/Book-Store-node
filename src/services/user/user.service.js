const {User} = require('../../models');

async function getAllUsers(){
    const users = await User.findAll({
        attributes: ['id', 'userName', 'fullName', 'email', 'active', 'createdAt', 'updatedAt']
    });
    return users;
}

module.exports = {
    getAllUsers,
}