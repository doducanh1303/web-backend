var createError = require("http-errors");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var product = require("./routes/product");
var user = require("./routes/user");
var cart = require("./routes/cart");
var news = require("./routes/news");
var productnews = require("./routes/productnew");
var productstore = require("./routes/productstore");
var indexRoute = require("./routes/index");
var search = require("./routes/seach");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/beatyfull", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
// let transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: testAccount.user, // generated ethereal user
//     pass: testAccount.pass, // generated ethereal password
//   },
// });

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", product);
app.use("/api", user);
app.use("/api", cart);
app.use("/api", news);
app.use("/api/", productnews);
app.use("/api/", productstore);
app.use("/api", search);
// app.set("view engine", "vash");
// app.set("views", path.join(__dirname, "/views"));

app.use("/", indexRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(4000, () => {
  console.log("SERVER start at http://localhost:4000");
});

//  let ransporter=nodemailer.createTransport({
//    hots:"doducanh48@gmail.com",
//    port:567,
//    secure:false,
//    auth:{
//     user:testAccount.user,
//    pass:testAccount.user
//   }
// })

module.exports = app;
