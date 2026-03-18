const mongoose = require ("mongoose")

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },

  order: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["Active","Inactive"],
    default: "Active"
  }

},{timestamps:true})

module.exports = mongoose.model("Category",categorySchema)  


// 