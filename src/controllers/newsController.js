const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/uploadFile");


const authMiddleware = require('../middlewares/authMiddleware');

const {
  getAllNews,
  getNewsById,
  addNews,
  editNews,
  deleteNewsById,
} = require("../services/newsServices");

router.get("/", authMiddleware.checkLogin, async (req, res) => {
  try {
    const news = await getAllNews();
    return res.status(200).send({
      status: "success",
      message: "Get All News",
      data: news,
    });
  } catch (error) {
    return res.status(500).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.get("/:id", authMiddleware.checkLogin, async (req, res) => {
  try {
    const news = await getNewsById(parseInt(req.params.id));
    return res.status(200).send({
      status: "success",
      message: "Get News By ID",
      data: news,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.post("/", authMiddleware.checkAdmin, upload.single("image"), async (req, res) => {
  const newData = req.body;
  const file = req.file;
  try {
    const data = await addNews(newData,file);

    return res.status(200).send({
      status: "success",
      message: "Success add News",
      data: data,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.put("/:id", authMiddleware.checkAdmin, async (req, res) => {
  const newData = req.body;
  try {
    const updatedData = await editNews(parseInt(req.params.id), newData);
    return res.status(200).send({
      status: "success",
      message: "Success update News",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.delete("/:id", authMiddleware.checkAdmin, async (req, res) => {
  try {
    const deleteData = await deleteNewsById(parseInt(req.params.id));
    if (deleteData) {
      return res.status(200).send({
        status: "success",
        message: "Success deleted News",
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
