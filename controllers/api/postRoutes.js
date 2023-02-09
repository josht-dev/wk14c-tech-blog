const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// GET /api/post/:id route for a post page
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      raw: true,
      include: [{ model: Comment }]
    });

    res.status(201).json(post);
  }
  catch(err) {res.status(500).json(err);}
});

module.exports = router;