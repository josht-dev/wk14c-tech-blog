const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// GET /api/post/:id route for a post page
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      raw: true,
    });
    const commentData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User, attributes: ['name'] }]
    });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    console.info(post);
    console.info(comments);
    //res.status(201).json(post);

    res.render('post', {
      post,
      comments,
      loggedIn: req.session.loggedIn,
      userId: req.session.userId
    });
  }
  catch(err) {res.status(500).json(err);}
});

module.exports = router;