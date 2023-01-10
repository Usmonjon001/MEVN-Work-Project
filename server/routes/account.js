const { Router } = require('express');
const User = require('../data/schemas/Users')
const AuthMiddleware = require('../middlewares/auth.middleware')
const jwt = require('jsonwebtoken');
const router = Router();

const { checkAll, checkUser, checkAdmin } = new AuthMiddleware();

router.get('/users/', checkAll, checkUser, checkAdmin, async (req, res) => {
    const userdb = await User.find({});
    res.send({
        status: "ok",
        msg: "Foydalanuvchilar Ro'yxatiga kirdingiz",
        users: userdb
    })
})

router.put('/:id', checkAll, checkUser, async (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decodedUser = await jwt.decode(token, process.env.TOKEN_KEYWORD);
        const user_id = req.params.id;
        const currentUser = await User.findById(user_id);

        if(currentUser._id.toString() !== decodedUser.user._id && decodedUser.user.username !== process.env.ADMIN_LOGIN){
            return res.send({
                status: "bad",
                msg: "Kechirasiz boshqa akkountni yangilash uchun sizda huquq yo'q!"
            })
        }

        const existUserWithUsername = await User.findOne({ username: req.body.username});

        if(existUserWithUsername && existUserWithUsername._id.toString() !== decodedUser.user._id){
            return res.json({
                status: "bad",
                msg: "Bunday Username allaqachon mavjud!"
            })
        };

        if(req.body.username == process.env.ADMIN_LOGIN){
            return res.send({ status: "bad", msg: "Bunday usernameni ishlatib bo'lmaydi"})
        }



        const user = await User.findByIdAndUpdate(user_id, { $set: req.body }, { new: true });
        return res.send({
                status: "ok",
                msg: "Foydalanuvchi muoffaqiyatli yangilandi!",
                user: user
            })
    } catch(err){
        console.log(err);
    }
})

router.get('/:id', checkAll, checkUser, checkAdmin, async (req, res) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decodedUser = await jwt.decode(token, process.env.ADMIN_KEYWORD);
        const user_id = req.params.id;
        const currentUser = await User.findById(user_id);

        console.log(decodedUser, '<================================', currentUser);

        console.log(currentUser._id.toString() == decodedUser.user._id);
        console.log(decodedUser.user.username !== process.env.ADMIN_LOGIN);

        if(currentUser._id.toString() == decodedUser.user._id || decodedUser.user.username !== process.env.ADMIN_LOGIN){
            return res.send({
                status: "ok",
                msg: "Kechirasiz boshqa akkountni Ko'rish uchun sizda huquq yo'q!"
            })
        }
        if(!currentUser){
            return res.send({
                status: "bad",
                msg: "Akkount Topilmadi!",
            })
        }

        return res.send({ status: "ok", msg: "Foydalanuvchi muoffaqiyatli Topildi", account: currentUser})
    } catch(e) {
        console.log(e);
    }
})

router.delete('/:id', checkAll, checkUser, async (req, res) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decodedUser = await jwt.decode(token, process.env.TOKEN_KEYWORD);
        const user_id = req.params.id;
        const currentUser = await User.findById(user_id);

        console.log(currentUser._id.toString() !== decodedUser.user._id, decodedUser.user.username !== process.env.ADMIN_LOGIN);

        if(currentUser._id.toString() !== decodedUser.user._id && decodedUser.user.username !== process.env.ADMIN_LOGIN){
            return res.send({
                status: "ok",
                msg: "Kechirasiz boshqa akkountni o'chirish uchun sizda huquq yo'q!"
            })
        }

        if(!currentUser){
            return res.send({
                status: "bad",
                msg: "Bunday akkaunt mavjud emas!"
            })
        }
        
        const user = await User.deleteOne({ _id: user_id }, (err, result) => {
            console.log(result);
            if(err){
                return res.send({
                    status: "bad",
                    msg: "Foydalanuvchi O'chirib bo'lmadi!"
                })
            } else {
                return res.send({
                    status: "ok",
                    msg: "Foydalanuvchi muoffaqiyatli O'chirildi!"
                })
            }
        })
    } catch(e){
        console.log(e);
    }
});




module.exports = router;

