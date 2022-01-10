var mongoose = require("mongoose");
var productstore = new mongoose.Schema(
  {
    _id:{ type: mongoose.Schema.Types.ObjectId, required: true },
    productname: "string",
    price: "string",
    quantity: "string",
    description: "string",
    img: "string",
  },
  { collection: "product"}
);
module.exports = mongoose.model("productstore",productstore);
