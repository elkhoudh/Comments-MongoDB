let mongoose = require("mongoose");
let postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/6/67/No_Photo_Available_0.jpg/revision/latest?cb=20171210210000"
  },
  imageUrl: {
    type: String,
    default:
      "https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/6/67/No_Photo_Available_0.jpg/revision/latest?cb=20171210210000"
  },
  likes: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Array,
    default: [
      {
        username: "",
        text: ""
      }
    ]
  }
});
module.exports = mongoose.model("Post", postSchema);
