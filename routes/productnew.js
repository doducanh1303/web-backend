const express = require("express");
const router = express.Router();

const ProducNewControllers = require('../controller/productnew.controller');

router.get("/get-productnew",ProducNewControllers.GET_PRODUCTS_NEWS);
router.get("/get-productnew/:id", ProducNewControllers.GET_PRODUCTS_NEW);

module.exports = router;
