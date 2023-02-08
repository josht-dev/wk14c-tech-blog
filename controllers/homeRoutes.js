const router = require('express').Router();
const { Post, User } = require('../models');

// GET for homepage
router.get('/', async (req, res) => {
  try {
    // Get posts db data
    const postsData = await Post.findAll({
      include: [{ model: User, attributes: ['name'] }]
    });
    const posts = postsData.map((post) => post.get({ plain:true }));
  
    // Send handlebars page to user
    res.render('homepage', { 
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;