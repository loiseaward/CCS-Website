//main backend file
import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();

const PORT = process.env.port || 8000; //can change later if needed

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool');

const passport = require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Backend server is operational");
});

app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});

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