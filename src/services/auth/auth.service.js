const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

const maxAge = 5*24 * 60 * 60;

function createToken(userName, id){
    return jwt.sign({userName, id}, 'secret', {
        expiresIn: maxAge,
    })
}


async function signUp(userName, password, fullName, email){
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    
    const user = await User.create({userName: userName, password: password, fullName: fullName, email: email});

    const token = createToken(userName, user.id);

    return {token, user};
}

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

async function login(userName, password){
    const user = await User.findOne({ 
        where: {
            userName: userName
        } });
        
    if(user){
        const result = await comparePassword(password, user.password);
        if(result){
            const token = createToken(userName, user.id);
            const data = user.dataValues;
            Object.assign(data, {token: token});
            
            return data;
        }
        else{
            return 'password is wrong';
        }
    }
    else
        return 'username not found';
}

module.exports = {
    signUp,
    login,
}