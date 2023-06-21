// const express = require('express');
// const topicsController = require('../controllers/topicsController');
// const router = express.Router();

// router.get('/', topicsController.getAllTopics);

// module.exports = router;

const express = require('express');
const topicsController = require('../controllers/topicsController');
const router = express.Router();

router.get('/', topicsController.getAllTopics);

module.exports = router;