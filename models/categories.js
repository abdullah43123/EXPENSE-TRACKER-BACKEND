const mongoose = require('mongoose')


const categorySchema = mongoose.Schema({
    categoryName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    color: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    budget: {
        type: mongoose.Schema.Types.Int32,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        required: true
    },

}, { timestamps: true })

const income = mongoose.model('category', categorySchema);

module.exports = income;