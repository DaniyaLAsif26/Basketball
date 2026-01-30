import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'

import EventRoute from './routes/Event.js'
import NewsRoute from './routes/News.js'
import LoginRoute from './routes/Login.js'
import LogoutRoute from './routes/Logout.js'
import OAuthRoute from './routes/OAuth.js'
import UserRoute from './routes/User.js'
import searchRoute from './routes/Search.js'

const app = express()

const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    'https://basketball-eight-wheat.vercel.app/',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, !isProduction);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        else {
            return callback(null, true);
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

const PORT = process.env.PORT || 5000
const HOST = '0.0.0.0'

const MONGO_URL = process.env.ATLAS_DB_URL || 'mongodb://127.0.0.1:27017/tba'

const connectDB = async () => {
    await mongoose.connect(MONGO_URL)
}
connectDB()
    .then(async () => {
        console.log("Connected To MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/api/event', EventRoute)
app.use('/api/news', NewsRoute)
app.use('/api/login', LoginRoute)
app.use('/api/logout', LogoutRoute)
app.use('/api/auth', OAuthRoute)
app.use('/api/user', UserRoute)
app.use('/api/search', searchRoute)

app.use('/hello', (req, res) => {
    res.status(200).send("Backend is running 🚀")
})

app.use("/api", (req, res) => {
    res.status(404).json({ message: "API route not found" });
});

app.use((req, res) => {
    res.status(404).json({ message: "API route not found" });
});

app.use((err, req, res, next) => {
    console.error("Server error:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, HOST, () => {
    console.log(`✅ Server running on ${HOST}:${PORT}`);
})