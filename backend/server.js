import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connect.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";

dotenv.config({
    path: './.env'
});

import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.routes.js"

const app = express()

const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser());

const allowedOrigins = [
    "https://zublog-kn48.onrender.com",
    "http://localhost:5173"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comment", commentRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend",  'dist', 'index.html'));
});

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is connected to ${PORT}`);
    })
})
.catch((err) => {
    console.log('MongoDB connection failed', err);
})