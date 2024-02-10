const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const BlackListModel = require("../models/blacklist.models");
dotenv.config();

const auth = async (req, res, next) => {
  const access_token = req.cookies["access_token"];
  const refresh_token = req.cookies["refresh_token"];
  try {
    const isBlackListedToken = await BlackListModel.findOne({
      access_token: access_token,
    });

    if (isBlackListedToken) {
      return res.status(400).send({ status: "fail", msg: "Login again" });
    }

    jwt.verify(access_token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };
      if (err) {
        if (err.message === "jwt expired") {
          jwt.verify(
            refresh_token,
            process.env.REFRESH_SECRET_KEY,
            async (err, decoded) => {
              if (err) {
                return res.status(400).send({
                  status: "fail",
                  msg: "Refresh token expired please login again",
                });
              } else {
                const access_token = jwt.sign(
                  {
                    userId: decoded.userId,
                    username: decoded.username,
                  },
                  process.env.ACCESS_SECRET_KEY,
                  {
                    expiresIn: "1d",
                  }
                );

                res.cookie("access_token", access_token, cookiesOption);
                next();
              }
            }
          );
        }
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    res.status(400).send({ status: "fail", msg: "Please login again" });
  }
};

module.exports = auth;
