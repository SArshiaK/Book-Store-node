const userService = require('../../services/user/user.service');

async function httpSignUp(req, res){
    try {
        const params = req.body;
        const {token, user} = await userService.signUp(params.userName, params.password, params.fullName, params.email);

        Object.assign(user.dataValues, {token: token});

        delete user.dataValues.password;
        res.status(201).json({success: true, message: 'signed up', data:user});
    } catch (error) {
        res.status(400).json({success: 'false', message: error.errors[0]['message']});
        console.log(error);
    }
}

async function httpLogin(req, res){
    try {
        const userName = req.body.userName;
        const password = req.body.password;
    
        const data = await userService.login(userName, password);
    
        if (data === 'password is wrong'){
            res.status(403).json({success: 'false', message: {data}});
        }
        else if (data === 'username not found'){
            res.status(403).json({success: 'false', message: {data}});
        }
        else {
            delete data.password;
            res.status(201).json({success: 'true', message: 'loged in', data: data});
        }
    } catch (error) {
      res.status(400).json({success: 'false', message: error.message});  
    }
}


module.exports = {
    httpSignUp,
    httpLogin

}