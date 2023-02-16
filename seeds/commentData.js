const { Comment } = require('../models');

const commentData = [
  {
    content: 'I loved this!',
    user_id: 1,
    post_id: 5,
    createdAt: '2023-01-06 10:05:34'
  },
  {
    content: 'It was ok...',
    user_id: 2,
    post_id: 5,
    createdAt: '2023-01-08 16:42:33'
  },
  {
    content: 'Woop! First!',
    user_id: 4,
    post_id: 5,
    createdAt: '2023-01-17 18:09:46'
  },
  {
    content: 'There is a typo...',
    user_id: 6,
    post_id: 5,
    createdAt: '2023-01-20 05:35:12'
  },
  {
    content: 'Woop! First!',
    user_id: 4,
    post_id: 1,
    createdAt: '2023-01-17 18:09:46'
  },
  {
    content: 'Woop! First!',
    user_id: 2,
    post_id: 2,
    createdAt: '2023-01-17 18:09:46'
  },
  {
    content: 'Woop! First!',
    user_id: 4,
    post_id: 3,
    createdAt: '2023-01-17 18:09:46'
  },
  {
    content: 'Woop! First!',
    user_id: 4,
    post_id: 4,
    createdAt: '2023-01-17 18:09:46'
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;