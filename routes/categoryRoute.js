const express = require("express");
const router = express.Router();
const {InsertCategoryData, FetchAllData, FetchById, DeleteById}= require('../controllers/categoriesController')
// import { InsertData } from "../controllers/accountController";


router.post('/category', InsertCategoryData);
router.get('/getCategory', FetchAllData);
router.get('/getIdCategory', FetchById);
router.delete('/deleteCategoryById', DeleteById);


module.exports = router;