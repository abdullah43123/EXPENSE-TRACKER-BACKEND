const express = require('express')
const mongoose = require('./db/config')
const User = require('./models/users')
const authRoutes = require('./routes/auth')
const categoryRoute = require('./routes/categoryRoute')
const incomeRoute = require('./routes/incomeRoute')
const expenseRoute = require('./routes/expenseRoute')
const cors = require('cors')
const verifyToken = require('./middleware/auth')

require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello from Railway!');
});

mongoose.connection.on("open", () => {
    console.log(`MongoDB Database Connected`)
})


app.post('/api/user/create', async (req, res) => {
    try {
        const data = await User(req.body)
        data.save()
        return res.send({ success: true, message: 'User Added Successfully' })

    } catch (error) {
        console.log(error)
        return res.send({ success: false, error: error })
    }

})



app.put('/api/user/update/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { email } = req.body
        const data = await User.findByIdAndUpdate(id, { email })
        console.log('data:::', data)
        return res.send({ message: 'user updated successfully', user: data })

    } catch (error) {

    }
})


app.get('/api/user/get', verifyToken, async (req, res) => {
    try {
        // const data = await User.find()
        // // console.log(data)
        return res.send({ success: true, user: req.user })
        // return res.send({ success: true, users: data })

    } catch (error) {

    }
})


app.use('/auth', categoryRoute)
app.use('/auth', authRoutes)
app.use('/auth', expenseRoute)
app.use('/auth', incomeRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));