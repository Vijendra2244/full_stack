const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connected = require("./db");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "https://real-ruby-lemming-suit.cyclic.app",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  try {
    res.status(200).send({ status: "success", msg: "Home page" });
  } catch (error) {
    res.status(400).send({ status: "fail", err: error.message });
  }
});

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  try {
    connected
      .then((res) => {
        console.log("connected to db");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(`server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
