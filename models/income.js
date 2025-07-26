const mongoose = require('mongoose')


const incomeSchema = mongoose.Schema({
    date : {
        type: mongoose.Schema.Types.String,
        required: true
    }, 
    description : {
        type: mongoose.Schema.Types.String,
        required: true
    }, 
    amount : {
        type: mongoose.Schema.Types.Int32,
        required: true
    }, 
    source : {
        type: mongoose.Schema.Types.String,
        required: true
    }, 
    userId : {
        type: mongoose.Schema.Types.String,
        required: true
    }, 
}, {timestamps : true})

const income = mongoose.model('income', incomeSchema);

module.exports = income;