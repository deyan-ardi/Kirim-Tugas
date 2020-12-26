const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Task = require("../models/task");
const { db } = require("../models/task");

//prepare location

router.put("/file", async (req, res) => {
  let task = await Task.updateOne(
    {
      _id: req.body.task,
      "user._id": req.body.user,
    },
    {
      $set: {
        "user.$.uploaded": Date.now(),
      },
    }
  );
  if (!task.nModified) {
    task = await Task.updateOne(
      {
        _id: req.body.task,
      },
      {
        $addToSet: {
          user: [
            {
              _id: req.body.user,
              uploaded: Date.now(),
            },
          ],
        },
      }
    );
  }

  console.log(task);
});
router.post("/file", async (req, res) => {
  if (req.files) {
    const user = await User.findOne({
      _id: req.body.user,
    });

    let fileUpload = req.files.file;

    fileUpload.mv(
      `./uploads/${req.body.task}/${user.name}.${req.body.type}`,
      (err) => {
        if (err) {
          throw "Error on upload file!";
        } else {
          res.send("File uploaded");
        }
      }
    );
  }
});

module.exports = router;
