const mongoose = require('mongoose');

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Connected Database"))
    .catch(err => console.log(err));