const express = require("express");
const router = express.Router();

const { upload } = require("../middlewares/uploadFile");
const authMiddleware = require('../middlewares/authMiddleware');


const {
  getAllEvents,
  getEventById,
  addEvent,
  editEvent,
  deleteEventById
} = require('../services/eventServices');

router.get("/", authMiddleware.checkLogin, async (req, res) => {
  try {
    const events = await getAllEvents();
    return res.status(200).send({
      status: "success",
      message: "Success get Event",
      data: events,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.get("/:id",  authMiddleware.checkLogin, async (req, res) => {
  try {
    const event = await getEventById(parseInt(req.params.id));
    return res.status(200).send({
      status: "success",
      message: "Success get Event",
      data: event,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.post("/",  authMiddleware.checkAdmin, upload.single("image"), async (req, res) => {
  const newData = req.body;
  const file = req.file;

  try {
    const data = await addEvent(newData, file);

    return res.status(200).send({
      status: "success",
      message: "Success add Event",
      data: data,
    });
  } catch (error) {
    return res.status(400).send({
      status: "failed",
      message: error.message,
    });
  }
});

router.put("/:id",  authMiddleware.checkAdmin, async (req, res) => {
  const newData = req.body;
  const {status} = req.body;
  try {
    const updatedData = await editEvent(parseInt(req.params.id), newData, Boolean(status));
    return res.status(200).send({
      status: "success",
      message: "Success update Event",
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
    const deleteData = await deleteEventById(parseInt(req.params.id));
    if (deleteData) {
      return res.status(200).send({
        status: "success",
        message: "Success deleted Event",
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