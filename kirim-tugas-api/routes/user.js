var express = require("express");
var router = express.Router();
const User = require("../models/user");
const e = require("express");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a sjsjsjsjj");
});




//auth user
const checkuser = async (req) => {
  if (req.body._id === "admin" && req.body.code === "admin") {
    return ({
      status: true,
      data: [{
        _id: "admin"
      }]
    })
  } else {
    let user = await User.find({
      _id: req.body._id
    })

    if (user.length != 0) {
      user = await User.find({
        _id: req.body._id,
        code: req.body.code
      })
      if (user.length != 0) {
        return ({
          status: true,
          data: user
        })
      } else {
        return ({
          status: false,
          error: "Wrong Password!"
        })
      }
    } else {
      return ({
        status: false,
        error: "Username not registred!"
      })
    }
  }
}
router.post("/auth", async (req, res) => {
  try {
    const user = await checkuser(req);
    if (user.status) {
      res.json(user.data)
    } else {
      throw user.error
    }
  } catch (err) {
    res.json({
      message: err
    });
  }
});
module.exports = router;