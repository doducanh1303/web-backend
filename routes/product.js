const express = require("express");
const router = express.Router();

const ProductControllers = require('../controller/product.controller');

router.get("/get-products", ProductControllers.GET_PRODUCTS);
router.get("/get-product/:id", ProductControllers.GET_PRODUCT);
router.get("/search", ProductControllers.SEARCH);

module.exports = router;
