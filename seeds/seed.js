const sequelize = require('../config/connection');
// Seeded user data from separate file
const { User } = require('../models');
const userData = require('./userData.json');
const seedPosts = require('./postData');
const seedComments = require('./commentData');

const seedDb = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed user login data
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
  console.log('\n----- USERS SEEDED -----\n');

  // Seed posts
  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  // Seed comments
  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
}

seedDb();