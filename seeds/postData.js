const { Post } = require('../models');

const postData = [
  {
    title: 'test title 1',
    summary: 'Here is a summary 1',
    content: 'The main content is here, it is typically longer than this.',
    user_id: 2,
    createdAt: '2023-01-01 11:15:33'
  },
  {
    title: 'test title 2',
    summary: 'Here is a summary 2',
    content: 'The main content is here, it is typically longer than this.',
    user_id: 4,
    createdAt: '2023-01-08 14:46:14'
  },
  {
    title: 'test title 3',
    summary: 'Here is a summary 3',
    content: 'The main content is here, it is typically longer than this.',
    user_id: 3,
    createdAt: '2023-01-16 19:55:27'
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;