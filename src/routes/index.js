const express = require('express');
const router = express.Router();

const authToken = require('../middlewares/authToken')

const multer = require('multer')
const upload = multer();

const newsController = require('../controllers/newsController');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const donorController = require('../controllers/donorController');


router.use('/news', newsController);
router.use('/users', authToken, userController);
router.use('/events', eventController);
router.use('/donors',donorController);
router.use('/', authController);

module.exports = router;