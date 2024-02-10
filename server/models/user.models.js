const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
