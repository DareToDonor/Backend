const express = require("express");
const router = express.Router();

const { getProfileUser } = require("../services/userServices");

router.get("/", async (req, res) => {
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

module.exports = router;
