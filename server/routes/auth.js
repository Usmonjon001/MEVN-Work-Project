const { Router } = require('express');
const Users = require('../data/schemas/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = Router();
// Register
router.post('/register/', async (req, res) => {
    try {
        const { username, password, fullname, gender } = req.body;
        console.log(username, password, fullname, gender);
        if(!username || !password || !fullname || !gender){
            return res.json({
                status: "bad",
                msg: "Xamma qatorlarni to'ldiring!"
            })
        }
        if(gender === 'jins'){
            return res.json({
                status: "bad",
                msg: "Jinsni Tanglang!"
            });
        }
        if (username.trim().length < 4) {
            return res.json({
                status: "bad",
                msg: "Username kamida 4ta belgidan tashkil topgan bo'lishi kerak"
            });
        }
        if (username.trim().length > 22) {
            return res.json({
                status: "bad",
                msg: "Username 22ta belgidan oshmasligi kerak!"
            });
        }

        if(username == process.env.ADMIN_LOGIN){
            return res.send({ status: "bad", msg: "Bunday usernameni ishlatib bo'lmaydi"})
        }

        if (password.trim().length < 8) {
            return res.json({
                status: "bad",
                msg: "Parol kamida 8ta belgidan tashkil topgan bo'lishi kerak"
            });
        }

        
        
        const user = await Users.findOne({ username });

        if(user){
            return res.json({
                status: "bad",
                msg: "Bunday akkount allaqachon mavjud!"
            })
        }

        const hashedPassword = await bcrypt.hashSync(password, 10);

        const newuser = await Users.create({
            username: username,
            password: hashedPassword,
            gender,
            fullname
        })

        console.log(newuser, "<==== The new user");

        const token = await jwt.sign({ user: newuser.toJSON() }, process.env.TOKEN_KEYWORD);

        return res.send({
            status: "ok",
            msg: "Muoffaqiyatli ro'yxatdan o'tdingiz",
            user: newuser,
            token
        })
        
    } catch (err) {
        console.log(err.message);
    }
})



// Login
router.post('/login/', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password){
            res.json({
                status: "bad",
                msg: "Xamma qatorlarni to'ldiring!"
            })
        }
        const user = await Users.findOne({ username });
        console.log(user);
        if(!user){
            res.json({
                status: "bad",
                msg: "Bunday akkount mavjud emas!"
            })
        }
        
        const hashedPassword = await bcrypt.compareSync(password, user.password); // true

        if(!hashedPassword){
            res.json({
                status: "bad",
                msg: "Akkount Yoki Parol No'to'ri!"
            })
        }

        const token = await jwt.sign({ user: user.toJSON() }, process.env.TOKEN_KEYWORD);
        const decodedToken = await jwt.decode(token, process.env.TOKEN_KEYWORD)
        console.log(decodedToken, '<================================ decodedToken');
        res.send({
            status: "ok",
            msg: "Tizimga muoffaqiyatli kirdingiz!",
            user: user,
            token
        })

    } catch (err) {
        console.log(err.message);
    }
})


// Admin Login

router.post('/admin/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.send({
                status: "bad",
                msg: "Iltimos Hamma qatorlarni to'ldiring!",
            })
        }


        if(username !== process.env.ADMIN_LOGIN || password !== process.env.ADMIN_PASS){
            return res.send({
                status: "bad",
                msg: "Akkaunt yoki parol no'to'gri"
            })
        }

        const token = jwt.sign({ user: { username, password }}, process.env.ADMIN_KEYWORD);
        
        return res.json({
            status: "ok",
            msg: "Admin Sifatida kirdingiz!",
            token
        })

    } catch (err) {
        console.log(err);
    }
})



module.exports = router;