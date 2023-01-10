const jwt = require('jsonwebtoken');
const User = require('../data/schemas/Users');
const bcrypt = require('bcrypt');

class AuthMiddleware {

    async checkUser(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1]          // Bu yerda ternary operator ishlatilgan! =>  ''  ? '' : ''
            if (!token) {
                return resizeBy.send({
                    status: "bad",
                    msg: 'Token Topilmadi!',
                    code: 401
                })
            }

            const verifyTokenUser = await jwt.verify(token, process.env.TOKEN_KEYWORD, (err, data) => {
                if (err) {
                    return false
                    // return res.send({ status: "bad", msg: "Tokenni tekshirib bo'lmadi" })
                } else {
                    return data
                }
            })

            const verifyTokenAdmin = await jwt.verify(token, process.env.ADMIN_KEYWORD, (err, data) => {
                if (err) {
                    return false
                    // return res.send({ status: "bad", msg: "Tokenni tekshirib bo'lmadi" })
                } else {
                    return data
                }
            })

            if (!verifyTokenUser && !verifyTokenAdmin) {
                return res.send({
                    status: "bad",
                    msg: "Token Ro'yxatdan o'tilmagan yoki tokenda xatolik bor!",
                    code: 403
                })
            }

            next()
        } catch (err) {
            console.log(err.message);
        }
    }


    async checkAdmin(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            console.log(req);
            console.log('checkAdmin');
            if (!token) {
                return res.send({
                    status: "bad",
                    msg: "Sizda to'ken yo'q",
                    code: 401
                })
            }

            const verifyToken = await jwt.decode(token, process.env.ADMIN_KEYWORD, (err, data) => {
                if (err) {
                    return res.send({ status: "bad", msg: "Token Xato" })
                } else {
                    return data
                }
            });

            if (!verifyToken) {
                return res.send({
                    status: "bad",
                    msg: "To'ken ro'yxatdan o'tmagan yoki token bilan xatolik mavjud!",
                    code: 403
                })
            }

            console.log(verifyToken);

            if (verifyToken.user.username == process.env.ADMIN_LOGIN && verifyToken.user.password == process.env.ADMIN_PASS) {
                next()
            } else {
                return res.send({
                    status: "bad",
                    msg: "Sizga admin huquqi berilmagan!"
                })
            }

        } catch (err) {
            console.log(err);
        }
    }


    async checkAll(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            console.log(req.headers.authorization?.split(' ')[1]);
            console.log('CheckAll');
            if (!token) {
                return res.send({
                    status: "bad",
                    msg: "Sizda to'ken yo'q",
                    code: 401
                })
            }

            const verifyTokenAsUser = await jwt.decode(token, process.env.TOKEN_KEYWORD);
            const verifyTokenAsAdmin = await jwt.decode(token, process.env.ADMIN_KEYWORD);

            if (!verifyTokenAsUser || !verifyTokenAsAdmin) {
                return res.send({
                    status: "bad",
                    msg: "To'ken ro'yxatdan o'tmagan yoki token bilan xatolik mavjud!",
                    code: 403
                })
            }

            // console.log(verifyTokenAsUser, "<================================================================ verifyTokenAsUser");

            const user = await User.findOne({ username: verifyTokenAsUser.user.username });
            
            let comparePassword = null;

            if(user){
                comparePassword = user.password === verifyTokenAsUser.password
            }

            if (verifyTokenAsAdmin.user.username == process.env.ADMIN_LOGIN
                &&
                verifyTokenAsAdmin.user.password == process.env.ADMIN_PASS
                ||
                user
            ) {
                next()
            } else {
                return res.send({
                    status: "bad",
                    msg: "Sizga admin huquqi berilmagan!"
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = AuthMiddleware