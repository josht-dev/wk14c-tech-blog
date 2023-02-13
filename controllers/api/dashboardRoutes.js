const router = require('express').Router();
const { Post, User } = require('../../models');


// GET /api/dashboard/new route to get the new post page
router.get('/new', async (req, res) => {
  try {
    console.info('test');
    // Send dashboard handlebars
    res.render('new-post', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  }
  catch (err) { res.status(500).json(err); }
});

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

// GET /api/dashboard/edit-post/:id to get the user the edit-post page
router.get('/edit-post/:id', async (req, res) => {
  // Get post data for edit
  const post = await Post.findByPk(req.params.id, { raw: true });

  // Send dashboard handlebars
  res.render('edit-post', {
    post,
    loggedIn: req.session.loggedIn,
    userId: req.session.userId
  });
});

// POST /api/dashboard/new-post

// PUT /api/dashboard/:id

// DELETE /api/dashboard/:id

module.exports = router;