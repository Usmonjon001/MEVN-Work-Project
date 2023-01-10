const { model, Schema } = require('mongoose');

const productsSchema = new Schema({
    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = model("Products", productsSchema);