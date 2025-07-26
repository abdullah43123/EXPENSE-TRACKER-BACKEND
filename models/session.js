const mongoose = require('mongoose')


const sessionSchema = mongoose.Schema({
    token: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

const income = mongoose.model('session', sessionSchema);

module.exports = income;