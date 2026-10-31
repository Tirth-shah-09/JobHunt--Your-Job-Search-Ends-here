import {register} from "../controllers/user.controller.js";
import {login,updateProfile,logout} from "../controllers/user.controller.js";
import express from 'express';
import isAuthenticated from "../middlewares/isAuthenticated.js";
import multer from "multer";

export const userRouter=express.Router();
/*Configuring multer , so that the data coming in mulitpart-data format from the frontend can be parsed
and that data can be made available in req.body and file in req.file
*/
const storage= multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});
const upload=multer({storage:storage});
userRouter.post('/register',upload.single('file'),register);
userRouter.post('/login', upload.none(),login);
userRouter.put('/profile/update',isAuthenticated,updateProfile);
userRouter.get('/logout',logout);

    