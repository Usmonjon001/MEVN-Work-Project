const { model, Schema } = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    orderedProducts: {
        type: Array,
        default: []
    }
}, { timestamps: true });

module.exports = model("Users", usersSchema);


// model                => "userSchema"ni userga bog'lanishda ishlatilinadi;
// Schema               => Databazaga qo'shiladigan malumotlarni strukturasini belgilaydi
// {timestamps: true}   => yaratilyotgan obyejtga ovtomatik tarzda createdAt va updatedAt xossalarini qo'shib beradi
