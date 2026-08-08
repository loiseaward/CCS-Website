//main backend file
import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const app = express();
const allowedOrigins = [
  'http://localhost:5173', 
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
}));
const pgSession = connectPgSimple(session);

const PORT = process.env.SERVER_PORT || 8000; //can change later if needed
const GCAL_API_KEY = process.env.GCAL_API_KEY;
const GCAL_ID = process.env.GCAL_ID;

//middleware here
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        store: new pgSession({ conString: process.env.DATABASE_URL, tableName: 'session', pruneSessionInterval: 60 * 60 * 24}), //connects to sql data table
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false, //save memory from inactive sessions
        cookie: {
            maxAge: 3 * 24 * 60 * 60 * 1000, //3 days
            httpOnly: true, //i dont rlly understand it but its for security reasons??
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);

//routes here

app.get('/api/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ //send information to frontend saved in session
      isAdmin: true,
      adminName: req.user.name,
      adminEmail: req.user.email,
    });
  } else {
    res.json({ isAdmin: false });
  }
});

app.get('/api/calendar-events', async (req, res) => {
  try {
    if (!GCAL_API_KEY || !GCAL_ID) {
      return res.status(500).json({ error: 'Google Calendar API is not configured' });
    }

    const googleUrl = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GCAL_ID)}/events`
    );
    googleUrl.search = new URLSearchParams({
      key: GCAL_API_KEY, //authorization
      orderBy: 'startTime',
      singleEvents: 'true',
      timeMin: new Date().toISOString(), // Only get events from now on
    });
    
    const response = await fetch(googleUrl);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Failed to fetch from Google Calendar',
      });
    }

    res.json(data.items || []); // Send only the events array to frontend
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
