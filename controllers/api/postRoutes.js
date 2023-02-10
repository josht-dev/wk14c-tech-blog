const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// GET /api/post/:id route for a post page
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [{ model: User, attributes: ['name'] }]
    });

    const commentData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User, attributes: ['name'] }]
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    
    console.info(post);
    res.render('post', {
      post,
      comments,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  }
  catch(err) {res.status(500).json(err);}
});

// POST /api/post/add-comment/:postId/:userId route to add comment to post
router.post('/add-comment/:postId/:userId', async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.newComment,
      user_id: req.params.userId,
      post_id: req.params.postId
    });
    res.redirect(`/api/post/${req.params.postId}`);
  } 
  catch (err) { res.status(500).json(err); }
});

module.exports = router;