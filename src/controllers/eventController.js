const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/uploadFile");


const {
  getAllEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEventById
} = require('../services/eventServices');
const { BOOLEAN } = require("sequelize");

router.get("/", async (req, res) => {
  const events = await getAllEvents();
  return res.status(200).send({
    status: "success",
    message: "Success get News",
    data: events,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const event = await getEventById(parseInt(req.params.id));
    return res.status(200).send({
      status: "success",
      message: "Success get News",
      data: event,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  const newData = req.body;
  const file = req.file;

  try {
    const data = await addEvent(newData, file);

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
  const {status} = req.body;
  try {
    const updatedData = await editEvent(parseInt(req.params.id), newData, Boolean(status));
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
    const deleteData = await deleteEventById(parseInt(req.params.id));
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