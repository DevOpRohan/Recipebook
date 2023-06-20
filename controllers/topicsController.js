const Topic = require('../models/topic');

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ name: 1 });
    res.render('topics/index', { topics });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};