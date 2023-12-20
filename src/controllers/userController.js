const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/uploadFile");
const authMiddleware = require('../middlewares/authMiddleware');

const { getProfileUser, editProfileUser } = require("../services/userServices")

router.get("/", authMiddleware.checkLogin , async (req, res) => {
  try {
    const idUser = req.userInfo.id;
    const userInfo = await getProfileUser(idUser);

    return res.status(200).send({
      status: "success",
      message: "get user info success",
      data: userInfo,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: "failed to get user info ",
    });
  }
});

router.put("/", authMiddleware.checkLogin, upload.single("imageProfile"), async (req,res) => {
  try {
    const idUser = req.userInfo.id;
    const newData = req.body;
    const file = req.file;

    const userInfo = await editProfileUser(idUser, newData, file);
    return res.status(200).send({
      status: "success",
      message: "get user info success",
      data: userInfo,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
