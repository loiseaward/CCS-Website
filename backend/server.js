//main backend file

require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000; //can change later if needed

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Backend server is operational");
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');

app.use(
    session({
        store: new pgSession({pool, tableName: 'session'}), //connects to sql data table
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false, //save memory from inactive sessions
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, //1 week in ms
            httpOnly: true, //i dont rlly understand it but its for security reasons??
        }
    })
);

const passport = require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

//for testing:
app.get('/', (req, res) => {
  res.send('Backend server is operational');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/api/me', (req, res) => { // for testing
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
});