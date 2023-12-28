const express=require("express");
const app=express();

const dotenv=require("dotenv")
dotenv.config()

const mongoose= require("mongoose");

const userRouter = require("./routes/userRoutes");
const petRouter = require("./routes/petRoutes");


app.use(express.json());
app.use("/user",userRouter);
app.use("/pets",petRouter);

const URI=process.env.URI
const DB_NAME=process.env.DB_NAME
const PORT=process.env.PORT || 5000

//better way to connect to database using IIFE
;(  async()=>{
    try{
        await mongoose.connect(URI+"/"+DB_NAME)//need to exclude to dotenv
        
        //scenario if express can't talk to database
        app.on("error",(error)=>{
            console.log("Error Express to DB",error);
            throw error
        })

        app.listen(5000,()=>{
            console.log(`App is listenning at ${PORT}`);
        })
    }
    catch(error){
        console.error("Error:",error)
        throw error
    }
})()
