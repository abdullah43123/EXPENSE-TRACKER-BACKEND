const express = require("express");
const router = express.Router();
const { InsertExpenseData, FetchAllData, FetchById, DeleteById } = require('../controllers/expenseController')
// import { InsertData } from "../controllers/accountController";


router.post('/insertExpense', InsertExpenseData);
router.get('/getIdExpense/:userId', FetchById);
router.delete('/deleteExpenseById', DeleteById);
router.get('/getExpense', FetchAllData);



module.exports = router;