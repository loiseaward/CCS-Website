//where you actually talk to Google

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => {

    res.send(`Logged in as ${req.user.display_name} (${req.user.email})`); //this is just for testing

    //res.redirect('/'); //need to change this to homepage in frontend
    //add this line back once homepage is constructed
  }
);

router.get('/login-failed', (req, res) => {
  res.status(401).send('Google login failed. <a href="/">Try again</a>');
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

module.exports = router;