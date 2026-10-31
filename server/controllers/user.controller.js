import {User} from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register= async (req,res) => {
    try{
        const {fullName,email,phoneNumber,password,role}=req.body;
        if(!fullName || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing, Please check again ",
                success:false
            })
        }
        // console.log(req.body )
        // return
        const user=await User.findOne({email});   //Checking if the User Already exists or not
        if(user){
            res.status(400).json({
                message:'User Already Exists with this email.',
                success:false
            })
        }
        
        const hashedPassword=await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })
        console.log("User Created Successfully");
         res.status(200).json({
            message:"User Registered Successfully",
            success:true
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            message:"An error Occured",
            success:false
        })
    }
}

export const login= async (req,res)=>{
    try{      
        const {email,password,role}=req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        //Checking  if the email entered by the user is correct or not
        let user=await User.find({email});
      
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password",
                success:false
            })
        }
    
        const passwordMatch=await bcrypt.compare(password,user[0].password);
        if(!passwordMatch){
            return res.status(400).json({
                message:"Invalid email or password",
                success:false
            })
        }
        //checking if the role is correct or not
        const userRole=user[0].role;
        
        if(role!==userRole){
             return res.status(400).json({
                message:"Account doesn't exist with the given role.",
                success:false
            })
        }
        const tokenData={
            userId:user[0]._id
        }
        
        const token=jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
        res.cookie("token",token);
        // console.log(user);
         user={
            _id:user[0]._id,
            fullName:user[0].fullName,
            email:user[0].email,
            phoneNumber:user[0].phoneNumber,
            role:user[0].role,
            profile:user[0].profile
        }
        
          return res.status(201).json({
                message:"Login Successful",
                user:user,
                success:true
        })
      
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
                message:"An error Occured",
                success:false
        })
    }
}

export const logout= async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            message:"An error occurred",
            success:false
        })
    }
}

export const updateProfile= async (req,res)=>{
    try{
        const {fullName,email,phoneNumber,skills,bio}=req.body;
    
        const file=req.file;
        // if(!fullName || !email || !phoneNumber ){
        //     return res.status(400).json({
        //         message:"Something is missing",
        //         success:false
        //     })
        // }
        // if(skills){
        // const skillArray=skills.split(",");
        // }
        const userId=req.id //id comes from middleware authentication
        let user=await User.findById(userId); //finding the user with  the specified ID
        
        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        //Updating data
        user.fullName=fullName;
        user.email=email;
        user.phoneNumber=phoneNumber;
        user.profile.bio=bio;
        user.profile.skills=skills;

        //Applying the changes back to mongoDB
        await user.save();

        // user={
        //     _id:user._id,
        //     fullName:user.fullName,
        //     email:user.email,
        //     phoneNumber:user.phoneNumber,
        //     role:user.role,
        //     profile:user.profile
        // }

        return res.status(200).json({
            message:"Profile updated successfully",
            user,
            success:true
        })
    }
    catch(err){
        console.log(err);
    }
}

