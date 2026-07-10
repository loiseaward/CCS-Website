const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db/pool');

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
        const avatarUrl = profile.photos[0].value;

        const existing = await pool.query(
          'SELECT * FROM users WHERE google_id = $1',
          [googleId]
        );

        if (existing.rows.length > 0) {
          const updated = await pool.query( //updates Google profile
            `UPDATE users
             SET email = $1, display_name = $2, avatar_url = $3, last_login_at = NOW()
             WHERE google_id = $4
             RETURNING *`,
            [email, displayName, avatarUrl, googleId]
          );
          return done(null, updated.rows[0]);
        }

        const inserted = await pool.query( //for 1st time log-in
          `INSERT INTO users (google_id, email, display_name, avatar_url)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [googleId, email, displayName, avatarUrl]
        );
        return done(null, inserted.rows[0]);
      } catch (err) {
        return done(err, null);
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

module.exports = passport;