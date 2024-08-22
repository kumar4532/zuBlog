import express from "express";
import dotenv from "dotenv"
import connectDB from "./DB/connect.js"
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import commentRoutes from "./routes/comment.routes.js"

dotenv.config({
    path: "./.env"
})

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comment", commentRoutes)

app.use(express.static(path.join(__dirname, 'dist/frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/frontend', 'index.html'));
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