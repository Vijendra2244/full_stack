const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controllers");

const postRouter = express.Router();

postRouter.route("/").get(getPost);
postRouter.route("/add").post(createPost);
postRouter.route("/update/:id").patch(updatePost);
postRouter.route("/delete/:id").delete(deletePost);

module.exports = postRouter;
