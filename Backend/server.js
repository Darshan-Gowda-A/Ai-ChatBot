import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with database");
  } catch (err) {
    console.log(err);
  }
};
