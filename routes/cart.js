const express = require("express");
const router = express.Router();

const cartControllers = require('../controller/cart.controller');
router.post('/addtocart',cartControllers.ADD_CART)

module.exports = router;
