const sequelize = require('../config/connection');
// Seeded user data from separate file
const { User } = require('../models');
const userData = require('./userData.json');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedDb = async () => {
  await sequelize.sync({ force: true });

  // Seed user login data
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  // Seed posts
  await seedPosts();

  // Seed comments
  await seedComments();

  process.exit(0);
}

seedDb();