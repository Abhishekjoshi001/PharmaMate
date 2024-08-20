// #starting project file 
import express from "express";
import { PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app=express();

app.get('/',(request,response) => {
    console.log(request)
    return response.status(234).send('hello')
});

app.listen(PORT,()=>{
    console.log(`App is listeing to port :${PORT}`)
})

// to connect the  database
mongoose
 .connect(mongoDBURL) 
 .then(() => {
    console.log('Connected to database');
 })
 .catch((error) => {
   console.log(error);   
 });

//  My basic changes