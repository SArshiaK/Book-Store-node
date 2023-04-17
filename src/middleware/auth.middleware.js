const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers.token;

    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(400).send({success: false, message: err.message});
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        console.log('token does not exist');
        res.status(400).send({success: false, message: 'token does not exist'});
    }
};

// const checkUser = (req, res, next) => {
//     const token = req.headers.token;
//     next();
//     if (token) {
//         jwt.verify(token, 'secret', async (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 res.locals.user = null;
//                 next();
//             } else {
//                 console.log(decodedToken);
//                 next();
//             }
//         });
//     } else {
//         res.locals.user = null;
//         next();
//     }
// };

module.exports = {
    requireAuth,
}