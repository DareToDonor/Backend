const express = require('express');
const router = express.Router();

const multer = require('multer')
const upload = multer();

router.get("/", (req, res) => {
  const idUser = req.userInfo.id;

});

router.post("/locations", upload.single('image'),  (req, res) => {
  // const idUser = req.userInfo.id;
  const newData = req.body;
  const file = req.file;
  console.log(file.fieldname);
  return res.send(newData);
});

module.exports = router;