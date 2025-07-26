const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        
    },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true })

const user = mongoose.model('user', userSchema)

module.exports = user

