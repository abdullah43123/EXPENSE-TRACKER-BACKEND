const mongoose = require('mongoose')


// mongoose.connect('mongodb+srv://abdullahaslam:abdullah123@cluster0.w3oh5mb.mongodb.net/')
// mongoose.connect('mongodb+srv://abdullahaslam:abdullah123@cluster0.w3oh5mb.mongodb.net/')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose