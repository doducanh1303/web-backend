const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
