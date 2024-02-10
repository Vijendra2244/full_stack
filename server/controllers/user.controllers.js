const UserModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const BlackListModel = require("../models/blacklist.models");
dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { username, email, password,gender } = req.body;

    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Password is invalid", status: "fail" });
      } else {
        const user = new UserModel({
          username,
          email,
          gender,
          password: hash,
        });
        await user.save();
        res.status(200).send({
          status: "success",
          msg: "User created successfully",
        });
      }
    });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, result) => {
        if (err) {
          return res
            .status(400)
            .send({ message: "Password is invalid", status: "fail" });
        } else {
          const access_token = jwt.sign(
            {
              userId: findUser._id,
              username: findUser.username,
            },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: "1d" }
          );
          const refresh_token = jwt.sign(
            {
              userId: findUser._id,
              username: findUser.username,
            },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: "7d" }
          );
          res.cookie("access_token", access_token, cookiesOption);
          res.cookie("refresh_token", refresh_token, cookiesOption);

          res.status(200).send({
            status: "success",
            msg: "User login successfully",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const access_token = req.cookies["access_token"];
    console.log(access_token);
    const findToken = await BlackListModel.findOne({ access_token });

    if (findToken) {
      return res
        .status(401)
        .send({ status: "allready", msg: "You are already logged out" });
    }

    const blackListToken = new BlackListModel({ access_token });
    await blackListToken.save();
    res
      .status(200)
      .send({ status: "success", msg: "User logged out successfully" });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
