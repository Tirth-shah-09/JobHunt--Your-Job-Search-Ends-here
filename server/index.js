import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import {userRouter} from './routes/user.route.js';
import { companyRouter } from './routes/company.route.js';
import { jobRouter } from './routes/job.route.js';
import { applicationRouter } from './routes/application.route.js';
import multer from 'multer'
dotenv.config({});
let app=express();


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const coreOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(coreOptions));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:5173');
    res.setHeader("Access-Control-Allow-Methods",'GET,POST');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type');
    next();
})



app.use('/user',userRouter);
app.use('/company',companyRouter);
app.use('/job',jobRouter);
app.use('/application',applicationRouter);
app.get("/yoman",(req,res)=>{
    res.send("Yo man You Got the screen");
})