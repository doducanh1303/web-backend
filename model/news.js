var mongoose = require("mongoose");
var news = new mongoose.Schema(
  {
    _id:{ type: mongoose.Schema.Types.ObjectId, required: true },
    title: "string",
    content:"string",
    img: "string",
  },
  { collection: "news"}
);
module.exports = mongoose.model("news",news);
