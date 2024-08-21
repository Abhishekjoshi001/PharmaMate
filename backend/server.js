// #starting project file 
import express from "express";
import dotenv from "dotenv";
import connectToMongodb from "./db/connectdb.js";

const PORT = process.env.PORT||8000;
const app = express();

dotenv.config();

app.use(express.json()) //Parsing

app.get("/",(req,res)=>{
  res.send("<h1>Hello world<h1>");
});

app.listen(PORT,()=>{
  connectToMongodb();
  console.log(`Server is running on ${PORT}`); //Connection Established
});