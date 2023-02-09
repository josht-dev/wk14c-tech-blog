const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// GET /api/users/ route to get all user
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      raw: true,
      attributes: { exclude: ['password'] }
    });

    res.status(203).json(userData);

  } catch (err) { res.status(500).json(err); }
});

// GET /api/users/:id route to get a user
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      raw: true,
      attributes: { exclude: ['password'] }
    });

    res.status(203).json(userData);

  } catch (err) { res.status(500).json(err); }
});

// Post /api/users/ route to create a user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.registerUsername,
      email: req.body.registerEmail,
      password: req.body.registerPassword
    });
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = newUser.dataValues.id;
      res.redirect('/');
    });
  }
  catch (err) { res.status(500).json(err); }
});

// Post /api/users/login route to login
router.post('/login', async (req, res) => {
  try {
    const errMsg = 'Incorrect email or password!';
    const userData = await User.findOne({
      where: { email: req.body.loginEmail }
    });
 
    // Email check
    if (!userData) {
      res.status(400).json({ message: errMsg });
    }

    // Password Check
    const validPassword = await userData.checkPassword(req.body.loginPassword);
    if (!validPassword) {
      res.status(400).json({ message: errMsg });
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.dataValues.id;
      res.redirect('/');
    });
  }
  catch (err) { 
    res.status(400).json(err) }
});

// Post /api/users/logout route to logout
router.post('/logout', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        //res.status(204).end();
        res.status(204).json({message: 'logged out'});
      });
    }
  } 
  catch (err) { res.status(404).end(); }
});

module.exports = router;