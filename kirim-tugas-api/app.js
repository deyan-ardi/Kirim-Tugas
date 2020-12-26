const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv/config");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const uploadRouter = require("./routes/upload");
const cors = require("cors");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(fileUpload({ createParentPath: true }));
// app.use(express.static(path.join(__dirname, "public")));

//load all route
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/task", taskRouter);
app.use("/upload", uploadRouter);

//connect to mongodb
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Db connected!")
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
