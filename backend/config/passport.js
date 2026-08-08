import 'dotenv/config';
import passport from 'passport';
import GoogleOAuth20 from 'passport-google-oauth20';
import sql from '../db/pool.js';

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
        const email = profile.emails[0].value;

        const existing = await sql`
          SELECT *
          FROM board_members
          WHERE email = ${email}
        `;

        
        if (existing.length === 1) {
          return done(null, existing[0]);
        }
        console.warn(`Google login rejected: ${email} is not in board_members`);
        return done(null, false);
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
    const result = await sql`
      SELECT *
      FROM board_members
      WHERE id = ${id}
    `;
    done(null, result[0] || null);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
