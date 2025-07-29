const mongoose = require('mongoose')


// mongoose.connect('mongodb+srv://abdullahaslam:abdullah123@cluster0.w3oh5mb.mongodb.net/')
// mongoose.connect('mongodb+srv://abdullahaslam:abdullah123@cluster0.w3oh5mb.mongodb.net/')
// console.log(process.env.MONGO_URI);

// mongoose.connect(process.env.MONGO_URI, {
mongoose.connect('mongodb+srv://abdullahaslam:abdullah123@cluster0.w3oh5mb.mongodb.net/test?retryWrites=true&w=majority&ssl=true', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose