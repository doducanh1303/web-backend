const mongoose = require("mongoose");
const news = require("./../model/news");


  module.exports = {
    GET_NEWS: async (req, res) => {
      const start = new Date().getTime();
      try {
        const query = req.query;
        if (query.keyword) {
          const reg = new RegExp(query.keyword, "i");
          query.title = { $regex: reg };
          delete query.keyword;
        }
        let limit = 6;
        if (query && query.size) {
          limit = Number(query.size);
          delete query.size;
        }
  
        const data = await news
          .find(query)
          .populate("author categories")
          .sort({ _id: -1 })
          .limit(limit);
        const totalCount = await news.countDocuments();
  
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
    GET_NEW: async (req, res) => {
      const start = new Date().getTime();
      try {
        const queryParams = req.params;
        const { id } = queryParams;
        console.log(`### id : ${id}`);
  
        const data = await news.findById(id).populate("");
  
        if (!data) {
          return res.send({
            status: 500,
            data: null,
            msg: `Can not get user with ID = ${ID} `,
            exe_time: new Date().getTime() - start,
          });
        }
  
        return res.send({
          status: 200,
          data,
          msg: "ok",
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
  