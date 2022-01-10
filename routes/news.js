const express = require("express");
const router = express.Router();

const NewController = require("../controller/new.controller");
router.get('/news',NewController.GET_NEWS);
router.get("/news/:id",NewController.GET_NEW);

module.exports = router;