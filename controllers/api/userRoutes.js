const router = require('express').Router();
const { User } = require('../../models');

// Post /api/users/ route to create a user
router.post('/', async (req, res) => {
  try { }
  catch (err) { }
});

// Post /api/users/login route to login
router.post('/login', async (req, res) => {
  try {
    console.log('req body');
    console.log(req.body);

    const errMessage = 'Incorrect email or password!';

    // Get user from db
    const userData = await User.findOne({
      raw: true,
      where: {
        email: req.body.email
      }
    });

    console.log('userdata');
    console.log(userData);

    // Check for user in db
    if (!userData) {
      res.status(400).json({ message: errMessage });
      return;
    }

    // Check for correct password
    const validPw = await userData.checkPassword(req.body.password);
    if (!validPw) {
      res.status(400).json({ message: errMessage });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      res.redirect('../');
    });


  } 
  catch (err) {res.status(500).json(err);}
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