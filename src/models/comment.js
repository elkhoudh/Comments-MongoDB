let mongoose = require("mongoose");
let commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  wassup: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Comment", commentSchema);
