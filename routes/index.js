const express = require('express');
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const helpController = require('../controllers/helpController');
const router = express.Router();

router.get('/', homeController.getHomePage);
router.get('/about', aboutController.getAbout);
router.get('/help', helpController.getHelp);

module.exports = router;



