const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    ref : "user"
  },
  token : {
    type : String,
    required : true
  },
  createdAt: {
    type : Date,
    default : Date.now(),
    expires: 300
  }
})

module.exports = mongoose.model("tokens", tokenSchema)