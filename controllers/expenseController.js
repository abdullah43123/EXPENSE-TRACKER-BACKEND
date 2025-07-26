const Expense = require('../models/expense')

const DeleteById = async (req, res) => {
    const { _id } = req.body

    try {
        const data = await Expense.findOneAndDelete({ _id })
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}


const FetchById = async (req, res) => {
    const { userId } = req.params

    try {
        const data = await Expense.find({ userId })
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const FetchAllData = async (req, res) => {
    try {
        const data = await Expense.find()
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const InsertExpenseData = async (req, res) => {
    try {
        const { date, amount, description, category, userId } = req.body
        if (!date, !amount, !description, !category, !userId) {
            res.send("All fields are required")
        }
        const data = await Expense({ date, description, amount, category, userId });
        await data.save();

        return res.send({ message: "Data Inserted succesfully", expense: data });
    } catch (error) {
        console.log("error::::", error);
    }
}

module.exports = { InsertExpenseData, FetchAllData, FetchById, DeleteById }