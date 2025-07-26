const Income = require('../models/income')


const DeleteById = async (req, res) => {
    const { _id } = req.body

    try {
        const data = await Income.findOneAndDelete({ _id })
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const FetchById = async (req, res) => {
    const { userId } = req.params

    try {
        const data = await Income.find({ userId })
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const FetchAllData = async (req, res) => {
    try {
        const data = await Income.find()
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const InsertData = async (req, res) => {
    try {
        const { date, amount, description, source, userId } = req.body
        if (!date, !amount, !description, !source, !userId) {
            res.send("All fields are required")
        }
        const data = await Income({ date, description, amount, source, userId });
        await data.save();

        return res.send({ message: "Data Inserted succesfully" });
    } catch (error) {   
        console.log("error::::", error);
    }
}

module.exports = { InsertData, FetchAllData, FetchById, DeleteById }