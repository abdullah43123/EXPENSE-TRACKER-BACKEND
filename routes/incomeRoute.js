const express = require("express");
const router = express.Router();
const { InsertData, FetchAllData, FetchById, DeleteById } = require('../controllers/accountController');

router.post('/income', InsertData);
router.get('/getIncome', FetchAllData);
router.get('/getIdIncome/:userId', FetchById);
router.delete('/deleteIncomeById', DeleteById);

module.exports = router;


// DATA
// {
//     "date": "todayDate",
//     "description": "Hello World",
//     "amount": 12000,
//     "source": "job",
//     "userId": "687e400bc33fb48834373f61"
// }