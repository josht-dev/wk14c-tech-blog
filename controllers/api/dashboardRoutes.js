const router = require('express').Router();
const { Post, User } = require('../../models');

// GET /api/dashboard/:id route to get the users dashboard
router.get('/:id', async (req, res) => {
  try {
    // Get user's posts from db
    const posts = await Post.findAll({
      raw: true,
      nest: true,
      where: { user_id: req.params.id },
      include: [{ model: User, attributes: ['name'] }]
    });

    // Send dashboard handlebars
    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  } 
  catch (err) { res.status(500).json(err); }
});

module.exports = router;