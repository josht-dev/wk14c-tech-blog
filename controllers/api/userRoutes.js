const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require("bcrypt");

// Post /api/users/ route to create a user
router.post('/login', async (req, res) => {

});

// Post /api/users/login route to login
router.post('/login', async (req, res) => {

});

// Post /api/users/logout route to logout
router.post('/logout', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
  } 
  catch (err) { res.status(404).end(); }
});

module.exports = router;