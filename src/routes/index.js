const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

const multer = require('multer')
const upload = multer();

const newsController = require('../controllers/newsController');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const locationController = require('../controllers/locationController');
const donorController = require("../controllers/donorController");


router.use('/news', newsController);
router.use('/users', authMiddleware.checkLogin, userController);
router.use('/events', eventController);
router.use('/donors', locationController, donorController);
router.use('/', authController);

module.exports = router;