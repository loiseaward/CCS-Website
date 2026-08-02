//where you actually talk to Google

import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => {

    console.log(`Logged in as ${req.user.display_name} (${req.user.email})`); //this is just for testing
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/'); //go to homepage deployed or local
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

export default router;
