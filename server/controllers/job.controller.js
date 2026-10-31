import {Job} from '../models/job.model.js';


//Jobs admin post karega
export const postJob= async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId = req.id;
        console.log(req.body);
        if(!title || !description || !requirements  || !location || !jobType  || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }
        const job=await Job.create({
            title,
            description,
            requirements,
            location,
            jobType,
            position,
            experienceLevel:experience,
            company:companyId,
            salary:Number(salary),
            created_by:userId
        })
        return res.status(201).json({
            message:"New Job created successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"An error occured",
            success:false
        })
    }
}

//jiti bhi created jobs hai vo sari la kar dega, sare admins ki create ki hui
export const getAllJobs= async(req,res)=>{
    
    try {
        const keyword= req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }
        const jobs=await Job.find(query).populate({
            path:'company'
        }).populate({
            path:'created_by'
        })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false    
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"An error Occured",
            success:true
        })
    }
}

//yaha hum job ki id dege , particaular id vali job return kar dega hume,..
export const getJobById= async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job= await Job.findById(jobId).populate({
            path:'applications'
        });
        if(!job){
             return res.status(404).json({
                message:"Jobs not found",
                success:false    
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
         return res.status(400).json({
            message:"An error Occured",
            success:true
        })
    }
}

//yaha par hum admin ki id dege ,particular admin ne jitni bhi jobs create ki hogi vo sari jobs la kar dega,....
export const getAdminJobs= async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
         return res.status(400).json({
            message:"An error Occured",
            success:true
        })
    }
}

export const updateJob= async(req,res)=>{
    try {
        //konsi job update karni hai, auski id req.params mei se lege..,
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                message:"Job ID is required",
                success:false
            })
        }
       
         //yaha tak thik, abhi aisa karte hai , khali company id hii update kr sake aisa rakhte hai..,
        const {company}= req.body;
        const updateData= {company,};
        const job= await Job.findByIdAndUpdate(jobId, updateData,{new:true});
          if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
         return res.status(201).json({
            message:"Job info updated",
            success:true
         })

    } catch (error) {
         console.log(error);
         return res.status(400).json({
            message:"An error Occured",
            success:true
        })
    }
}