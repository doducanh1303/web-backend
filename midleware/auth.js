const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("run.....");
    const data = jwt.verify(token);

    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      if (req.url === "/user/logout" || req.url === "/user/logout") {
        console.log("pass");
        next();
      }
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      error: "Not authorized to access this resource",
    });
  }
};
module.exports = auth;
