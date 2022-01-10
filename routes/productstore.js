const express = require("express");
const router = express.Router();

const ProducStoreControllers = require('../controller/productstore.controller');

router.get("/get-productstore",ProducStoreControllers.GET_PRODUCTS_STORE);


module.exports = router;
