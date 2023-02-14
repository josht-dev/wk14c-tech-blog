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
  try {
    // Get post data for edit
    const post = await Post.findByPk(req.params.id, { raw: true });

    // Send dashboard handlebars
    res.render('edit-post', {
      post,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  }
  catch (err) { res.status(500).json(err); }
});

// POST /api/dashboard/new-post to add new post
router.post('/new-post', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.redirect(`/api/dashboard/${req.body.user_id}`);
  }
  catch (err) { res.status(500).json(err); }
});


// PUT /api/dashboard/edit-post/:id
router.put('/edit-post/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: { id: req.params.id }
    });
    // TODO - Get redirect to point back to dashboard
    //res.redirect(303, `/api/dashboard/${req.body.user_id}`);
    res.status(200).json(postData);
  }
  catch (err) { res.status(500).json(err); }
});

// DELETE /api/dashboard/:id
router.delete('/edit-post/:id', async (req, res) => {
  try {
    console.info('delete hit');
    const delPost = await Post.destroy({ where: { id: req.params.id } });
    // TODO - Add validation for post id not found
    console.info(delPost);

    res.status(200).json(delPost);
    // TODO - Get redirect working from route instead of from frontend js
    //res.redirect(`/api/dashboard/${req.body.user_id}`);
  } 
  catch (err) { res.status(500).json(err.message); }
});

module.exports = router;