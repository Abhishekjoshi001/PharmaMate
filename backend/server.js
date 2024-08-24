import express from "express";
import dotenv from "dotenv";
import connectToMongodb from "./db/connectdb.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js"
import cookieParser from "cookie-parser"; // Add this import

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();

app.use(express.json()); // Parsing JSON
app.use(cookieParser()); // Parse cookies
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/medicine", medicineRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello world<h1>");
});

app.listen(PORT, () => {
  connectToMongodb();
  console.log(`Server is running on ${PORT}`);
});
