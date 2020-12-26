const express = require("express");
const router = express.Router();
const Task = require("../models/task")

/* GET users listing. */
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.json({
      message: err
    })
  }
});

router.post("/incoming", async (req, res) => {
  try {
    const tasks = await Task.find({
      "user._id": {
        $ne: req.body.user
      }
    });
    res.json(tasks);
  } catch (err) {
    res.json({
      message: err
    })
  }
});

router.post("/sent", async (req, res) => {
  try {
    const tasks = await Task.find({
      "user._id": req.body.user
    });
    res.json(tasks);
  } catch (err) {
    res.json({
      message: err
    })
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tasks = await Task.findOne({
      _id: req.params.id
    });
    res.json(tasks);
  } catch (err) {
    res.json({
      message: err
    })
  }
});

module.exports = router;