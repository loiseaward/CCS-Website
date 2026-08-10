//where you actually talk to Google

import express from 'express';
import passport from 'passport';

const router = express.Router();

//Directs the user to Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//callback from Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {

    console.log(`Logged in as ${req.user.name} ${req.user.email}`); //this is just for testing
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173/'); //go to homepage deployed or local
  }
);

router.get('/login-failed', (req, res) => {
  res.status(401).send(`<a href="/auth/google">Account not authorized. Try again</a>`);
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => { //clears session
    if (err) return next(err);

    req.session.destroy((destroyErr) => {
      if (destroyErr) return next(destroyErr);

      res.clearCookie('connect.sid'); //destroys cookies on client side
      res.json({ loggedOut: true });
    });
  });
});

export default router;
