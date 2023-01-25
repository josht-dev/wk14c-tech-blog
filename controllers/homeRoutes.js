const router = require('express').Router();
const { Post, User } = require('../models');

// GET for homepage
router.get('/', async (req, res) => {
  try {
    // Get posts db data
    const postsData = await Post.findAll({
      include: [{ model: User }]
    });
    const posts = postsData.map((post) => post.get({ plain:true }));
    
    // Remove sensitive data before sending over to user
    posts.forEach(post => {
      delete post.user.email;
      delete post.user.password;
    });

    // Send handlebars page to user
    res.render('homepage', { posts });
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;