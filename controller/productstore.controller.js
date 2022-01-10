const mongoose = require("mongoose");
const productstore = require("./../model/productstore");
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
}
module.exports = {
  GET_PRODUCTS_STORE: async (req, res) => {
    const start = new Date().getTime();

    try {
      const page = parseInt(req.query.page || "1");
      const pageSize = parseInt(req.query.pageSize);

      const data = await productstore
        .find({})
        .populate("author categories")

        .skip(page > 0 ? (page - 1) * pageSize : 0)
        .limit(pageSize);
      const totalCount = await productstore.countDocuments();

      res.send({
        status: 200,
        msg: "ok",
        data,
        found: data.length,
        total: totalCount,
        exe_time: new Date().getTime() - start,
      });
    } catch (e) {
      console.log("internal server error", e.message);
      res.send({
        status: 500,
        data: null,
        msg: "internal server error",
        exe_time: new Date().getTime() - start,
      });
    }
  },
};
