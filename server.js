import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configureDB/db.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
const app = express();
connectDB()


app.use(cors({
    origin: "https://nested-task-app-frontend.vercel.app",
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/", userRoutes);



app.listen(process.env.PORT, () => console.log("Server is running on port " + process.env.PORT));
