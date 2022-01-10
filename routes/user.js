const express = require("express");
const router = express.Router();
const auth = require("../midleware/Auth");

const UserControllers = require("../controller/user.controller");

router.post("/login", UserControllers.login);
router.post("/register", UserControllers.register);
router.post("/logout", UserControllers.logout);
// router.post("/sendmail",UserControllers.upto)

module.exports = router;
