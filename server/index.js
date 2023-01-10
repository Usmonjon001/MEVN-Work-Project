require('dotenv').config()                  // bu dasturlardan env fayllardan foydalanish ruxsat beradi
// Libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./data/index')
const expressUpload = require('express-fileupload')

// Routes
const authroute = require('./routes/auth')
const account = require('./routes/account')
const products = require('./routes/products');
const router = require('./routes/products');




const app = express();
app.use(expressUpload())
app.use('/uploads', express.static('uploads'));
app.use(cors({                             //  => cors bu portga http so'rovlarni qayerdan kelishini belgilaydi.
    origin: "*"                            // => portga barcha http so'rovlarni.
}))
app.use(express.json())                    // => serverga kelayotgan so'ro'vlarni json formatga o'tkazish.



app.use("/api/v1/auth", authroute)
app.use("/api/v1/account", account)
app.use("/api/v1/products", products)

app.listen(process.env.PORT, () => {
    console.log(`The Server is running at http://localhost:${process.env.PORT}`);
})