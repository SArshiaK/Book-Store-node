const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function findUser(id){
    
}

const requireAuth = (req, res, next) => {
    const token = req.headers.token;


    if (!token) {
        console.log('token does not exist');
        return res.status(400).send({ success: false, message: 'token does not exist' });
    }

    jwt.verify(token, 'secret', async (err, decodedToken) => {

        if (err) {
            console.log(err.message);
            return res.status(400).send({ success: false, message: err.message });
        }

        const user = await User.findOne({ where: { id: decodedToken['id']} });
        if(!user){
            return res.status(400).send({ success: false, message: "User not found" });
        }
        if(user.active === false){
            return res.status(400).send({ success: false, message: "User is blocked" });
        }

        console.log(decodedToken);
        req.decodedToken = decodedToken;
        next();

    });

};


module.exports = {
    requireAuth,
}