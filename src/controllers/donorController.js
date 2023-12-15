const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadFile");

const { addDonorLocation } = require("../services/donorServices");

router.get("/", (req, res) => {
  const idUser = req.userInfo.id;
});

router.post("/locations", upload.single("image"), async (req, res) => {
  try {
    const newData = req.body;
    const file = req.file;
    const addNewLocations = await addDonorLocation(newData, file);
    return res.status(200).json({
      status: 'success',
      message: "File uploaded successfully",
      addNewLocations,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
});

module.exports = router;
