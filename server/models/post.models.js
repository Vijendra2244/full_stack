const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    device: {
      type: String,
      required: true,
    },
    userId:{
        type:String
    }
  },
  { versionKey: false }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
