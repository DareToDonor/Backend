const express = require("express");
const router = express.Router();

const { register, login } = require("../services/authServices");

router.post("/register", async (req, res) => {
  const data = req.body;
  try {
    const registration = await register(data);

    return res.status(200).send({
      status: "success",
      message: "User created successfully",
      data: registration,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.post("/login", async (req,res) => {
  const data = req.body;
  try {
    const {payload, token} = await login(data);
    return res.status(200).send({
      status: "success",
      message: "User Login successfully",
      data: payload,
      token,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
})

module.exports = router;
