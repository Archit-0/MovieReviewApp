import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


//file
import connectDB from "../backend/config/db.js";
import userRoutes from "../backend/routes/userRoutes.js";


//configuration
dotenv.config();
connectDB();


const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/users", userRoutes);


const port = 3001;


//routes
app.listen(port, console.log(`server is running at ${port} `));
