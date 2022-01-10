const mongoose = require("mongoose");
const User = require("./../model/user");
const bcrypt = require("bcrypt");
const moment = require("moment"); // require
const JWT = require("jsonwebtoken");

const sgMail = require("@sendgrid/mail");
const { SEND_GRID_KEY } = require("../config");
const req = require("express/lib/request");
const res = require("express/lib/response");

const mailToResetPassword = async (user) => {
  sgMail.setApiKey(SEND_GRID_KEY);
  const htmlContent =
    "<div><p>Hi " +
    user.email +
    ", </p> Please Click on the link to change your password.<br><a href=" +
    ">Click here to change your password</a></div>";
  const subject = "Forgot password - web5days.com";
  return sgMail
    .send({
      to: user.email,
      from: "thangdetao@gmail.com",
      subject,
      html: htmlContent,
    })
    .then((out) => {
      console.log(out);
      return true;
    })
    .catch((e) => {
      console.log("err...........", e);
      return false;
    });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const token = JWT.sign({ _id: user._id }, "dasjdkjsaj");
    console.log("token..........", token);
    res.send({
      user,
      token,
      msg: "ok",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
      data: null,
    });
  }
};

const register = async (req, res) => {
  const body = req.body;
  console.log("body......", body);
  if (!body) {
    return res.status(400).json({
      success: false,
      message: "You must provide a user",
    });
  }
  if (!body.name) {
    return res.status(400).json({
      success: false,
      message: "you must provide a user with username",
    });
  }
  if (!body.email) {
    return res.status(400).json({
      success: false,
      message: "you must provide a user with email",
    });
  }
  if (!body.password) {
    return res.status(400).json({
      success: false,
      message: "you must provide a user  with password",
    });
  }
  if (!body.address) {
    return res.status(400).json({
      success: false,
      message: "you must provide a user with address",
    });
  }
  try {
    const userExist = await User.findOne({ email: body.email });
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const data = await user.save();
    if (userExist) {
      return res.status(400).json({
        success: false,
        error: `The user with email: ${body.email} is existed`,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "thanh cong",
        data: user,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: "user not created",
    });
  }
};
// UPDATE:(req,res)=>{
//   try{
//     const body=req.body
//     const queryParams = req.params;
//     const { id } = queryParams;
//     const query={}
//     if(body.name !== 'undefined'){
//       query.name=body.name
//     }
//     if(body.age !=='undefiend'){
//       query.age=body.age
//     }
//     if(body.address !=='undefiend'){
//       query.age=body.address
//     }
//     if(body.birthday !== 'undefiend'){
//       query.birthday=body.birthday
//     }
//
//     const data=User.findOneAndDelete({_id:id})
//     if(!data){
//       res.send({
//         status:500,
//         msg:'errror',
//
//       })
//     }
//     res.status(200).send({
//       data,
//       msg:'oke'
//     })
//
//   }catch(err){
//
//   }
// },

const upto = async (req, res) => {
  const email = req.body.email;
  console.log(`### email : ${email}`);
  try {
    const user = await User.findOne({ email });
    console.log("user.....", user);
    if (!user) {
      return res.status(500).send({
        status: 500,
        success: false,
        msg: "Can not find user",
      });
    }
    const isSentMail = await mailToResetPassword(user);
    console.log("run.......", isSentMail);
    if (isSentMail) {
      return res.status(200).send({
        status: 200,
        user,
        success: true,
        msg: "Confirmed",
      });
    }
    return res.status(500).send({
      status: 500,
      success: false,
      msg: "Fail to send mail",
    });
  } catch (error) {
    console.log("internal server error", error.message);
    return res.status(500).send({
      status: 500,
      error: error.message,
      success: false,
      msg: "internal server error",
    });
  }
};
const logout = async (req, res) => {
  console.log("redddddd", req.user);
  res.redirect("/");
};

module.exports = {
  login,
  register,
  upto,
  logout,
};
