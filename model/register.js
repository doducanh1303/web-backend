const mongoose = require("mongoose");
const Joi=require('@hapi/joi');
const registerChema = mongoose.Schema(
  {
    username: Joi.String().min(6).required(),

    email: Joi.String().min(6).required(),
    password:  Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    address: Joi.String().required(),

    birthday: Joi.number()
        .integer()
        .min(1900)
        .max(2013),

    //  0 = user , 1 = admin
  },
  { collection: "user" }
);

const register = mongoose.model("register", registerChema);

module.exports = register;
