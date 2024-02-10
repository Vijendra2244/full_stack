const PostModel = require("../models/post.models");

const getPost = async (req, res) => {
  try {
    const query = req.query;
    const postData = await PostModel.find(query);
    res
      .status(200)
      .send({ status: "success", msg: "get post data", data: { postData } });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const postData = req.body;
    const post = new PostModel(postData);
    await post.save();
    res
      .status(200)
      .send({ status: "success", msg: "create post", data: { post } });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatePost = await PostModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send({ status: "success", msg: "post update" });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await PostModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ status: "success", msg: "post delete" });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

module.exports = { getPost, createPost, updatePost, deletePost };
