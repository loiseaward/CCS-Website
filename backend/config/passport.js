import 'dotenv/config';
import passport from 'passport';
import GoogleOAuth20 from 'passport-google-oauth20';
import pool from '../db/pool.js';

const { Strategy: GoogleStrategy } = GoogleOAuth20;

passport.use(
  new GoogleStrategy(
    { //database credentials found in .env
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try { //Google profile objects
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const displayName = profile.displayName;

        const existing = await pool.query(
          'SELECT * FROM users WHERE email = $1',
          [email]
        );

        
        if (existing.rows.length === 1) {
          return done(null, existing.rows[0]);
        } else{
          return done(err, null);
        }
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.serializeUser((user, done) => { //only store id to save memory
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { //find people when logging back in
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0] || null);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
