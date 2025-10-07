import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

//routes
import authRouter from "./routes/authRoutes.js";

//database
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB(); 

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true, 
}))

//API Endpoints
app.get('/', (req, res) => {
    res.send('API Working!');
})
app.use('/api/auth', authRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})