const Category = require('../models/categories')

const DeleteById = async (req, res) => {
    const { _id } = req.body

    try {
        const data = await Category.findOneAndDelete({ _id })
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}


const FetchById = async (req, res) => {
    const { userId } = req.body
    
    try {
        const data = await Category.find({userId})
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const FetchAllData = async (req, res) => {
    try {
        const data = await Category.find()
        console.log(data)
        return res.send({ success: true, users: data })

    } catch (error) {
        res.send("Error" + error);
    }
}

const InsertCategoryData = async (req, res) => {
    try {
        const { categoryName, color, budget, userId } = req.body
        if (!categoryName || !color || !budget || !userId) {
            res.send("All fields are required")
        }
        const data = await Category({ categoryName, color, budget , userId });
        await data.save();

        return res.send({ message: "Data Inserted succesfully" });
    } catch (error) {
        console.log("error::::", error);
    }
}

module.exports = {InsertCategoryData, FetchAllData, FetchById, DeleteById}