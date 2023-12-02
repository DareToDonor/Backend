const express = require("express");
const router = express.Router();

const authToken = require('../middlewares/authToken')

const {
  getAllNews,
  getNewsById,
  addNews,
  editNews,
  deleteNewsById,
} = require("../services/newsServices");

router.get("/", async (req, res) => {
  const news = await getAllNews();
  return res.status(200).send({
    status: "success",
    data: news,
  });
});

router.get("/:id", authToken, async (req, res) => {
  try {
    const news = await getNewsById(parseInt(req.params.id));
    return res.status(200).send({
      status: "success",
      data: news,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const newData = req.body;

  try {
    const data = await addNews(newData);

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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
