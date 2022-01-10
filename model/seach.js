const mongoose = require("mongoose");

const seach =new schema(
  {
    price:Number
  },
  {collection:'product'}
)
const seach=mongoose.model('seach',seach)
module.exports=seach;