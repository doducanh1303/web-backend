const mongoose = require("mongoose");

const userChema = mongoose.Schema(
  {
    username: String,

    email: String,
    gender: String,
    password: String,
    address: String,
    date: String,
  },
  { collection: "user" }
);

const User = mongoose.model("User", userChema);

module.exports = User;
