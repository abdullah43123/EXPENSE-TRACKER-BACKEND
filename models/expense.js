const mongoose = require('mongoose')


const expenseSchema = mongoose.Schema({
    date: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    amount: {
        type: mongoose.Schema.Types.Int32,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    userId : {
            type: mongoose.Schema.Types.String,
            required: true
        }, 
}, { timestamps: true })

const expense = mongoose.model('expense', expenseSchema);

module.exports = expense;