const { Router } = require('express');
const AuthMiddleware = require('../middlewares/auth.middleware');
const Products = require('../data/schemas/Products');
const { checkAll, checkUser, checkAdmin } = new AuthMiddleware();
const router = Router();
const path = require('path');
const { default: fetch } = require('node-fetch');

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Products.find({});
        res.json(products)
    } catch (err) {
        console.log(err);
    }
});

// Get Single Book
router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const book = await Products.findById({ _id });
        res.json(book)
    } catch (err) {
        console.log(err);
    }
});

// Create Products
router.post('/', async (req, res) => {
    try {
        const { photo, title, text, created_by } = req.body;

        console.log(req.files, '<================================================ Buffer');

        const newphoto = await fetch(
            'https://www.filestackapi.com/api/store/S3?key=ASsLiERYSQ2GA7DcSKl2Uz',
            {
                method: 'POST',
                headers: { 'Content-Type': "image/png"},
                body: req.files.photo.data
            }
            ).then((response) => {
                return response.json()
            }).catch((error) => {
                console.error('Error:', error);
              });

            console.log(req.body, "<================================================================ req Body");

            if(!newphoto){
                res.send({
                    status: "bad",
                    msg: "Rasm Yuklanmadi"
                })
            }

        // if(!title || !text || !created_by) {
        //     res.send({
        //         status: "bad",
        //         msg: "Iltimos Hamma Qatorlarni to'ldirin!",
        //     })
        // }

        req.body.photo = newphoto.url

        console.log(req.body , "<================================================================ Reques Body");

        const newbook = Products.create({ ...req.body });

        res.send({
            status: "ok",
            msg: "Kitob Muaffaqiyatli Qo'shildi.",
            book: newbook
        })
    } catch (err) {
        console.log(err);
    }
});

// Delete Products
router.delete('/:id', checkAll, checkUser, checkAdmin, async (req, res) => {
    try {
        const _id = req.params.id;
        const book = await Products.deleteOne({ _id }, (err, result) => {
            if (err) {
                res.send({
                    status: "bad",
                    msg: "Kitobni o'chirib bo'lmadi",
                })
            }
            else {
                res.send({
                    status: "ok",
                    msg: "Kitob muaffaqiyatli o'chirildi",
                })
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// Update Products
router.put('/:id', checkAll, checkUser, checkAdmin, async (req, res) => {
    const _id = req.params.id;
    const newdata = {...req.body}
    const book = await Products.updateOne({ _id}, { ...newdata })
});

module.exports = router;





// files: [Object: null prototype] {
//     photo: {
//       name: 'carbon (5).png',
//       data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 08 00 00 00 0b f0 08 06 00 00 00 96 dd d0 b4 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 20 00 ... 643915 more bytes>,
//       size: 643965,
//       encoding: '7bit',
//       tempFilePath: '',
//       truncated: false,
//       mimetype: 'image/png',
//       md5: 'bf34c8afe20341e35018e9ec5b4bdc03',
//       mv: [Function: mv]
//     }
//   },
//   body: [Object: null prototype] {
//     title: 'Lorem  is a big boy for 👦 but it doesn’t make it all all right right I I just just want want you then 67666 123 433434344344',
//     text: 'I just wanted you in my room and I have no clue 🕵️‍♀️ 🕵️‍♂️ is going with her for a little longer but it was like 👍 to do that and then we have the best day and a good 😌 😊 👍 but I’m sure it  Texted 123213213213123123 to to confirm confirm with with you you can can you you can can you you have have a a lot lot of of people people are are not not allowed allowed ',
//     created_by: '{\n' +
//       '  "_id": {\n' +
//       '    "$oid": "63bba3274666210a454add6b"\n' +
//       '  },\n' +
//       '  "username": "Hello",\n' +
//       '  "password": "$2b$10$IG2ut31J2j4FxZtfvDJWouecJI3pdvDZ7Ndmswd23PgdBb0ktjSEC",\n' +
//       '  "fullname": "Usmonjon Tokhirjonov",\n' +
//       '  "gender": "erkak",\n' +
//       '  "age": "21",\n' +
//       '  "city": "Asaka",\n' +
//       '  "orderedProducts": [],\n' +
//       '  "createdAt": {\n' +
//       '    "$date": {\n' +
//       '      "$numberLong": "1673241383831"\n' +
//       '    }\n' +
//       '  },\n' +
//       '  "updatedAt": {\n' +
//       '    "$date": {\n' +
//       '      "$numberLong": "1673241402521"\n' +
//       '    }\n' +
//       '  },\n' +
//       '  "__v": 0\n' +
//       '}'
//   },