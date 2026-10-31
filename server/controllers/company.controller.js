import {Company} from '../models/company.model.js';
export const registerCompany= async (req,res)=>{
    try{
        const {companyName,description,location,website}=req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company Name is required",
                success:false
            })
        }
        let company=await Company.findOne({name:companyName});
        //Here we are registering company , and before it we check if the name already present in DB
        //if the name already present , we deny the request because we want the name of the company to be unique.
        if(company){
            return res.status(400).json({
                message:"You can't register the same company",
                success:false
            })
        }
        company=await Company.create({
            name:companyName,
            description,
            location,
            website,
            userId:req.id
        })
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:"An error Occured",
            success:false
        })
    }
}

export const getCompany= async(req,res) =>{
    try{
        const userId=req.id; //id comes from middleware authentication...
        const companies=await Company.find({userId,});
        if(!companies){
            return res.status(404).json({
                message:"Compnay not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company found.",
            company:companies
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:"An error Occured",
            success:false
        })
    }
}

export const getCompanyById= async(req,res) =>{
    try{
        const companyId= req.params.id;
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(200).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:"An error Occured",
            success:false
        })
    }
}

export const updateCompany= async(req,res)=>{
    try{
        const {name,description , website,location}=req.body;
        const file=req.file;
        //idhar cloudinary aayega

        const updateData={name,description,website,location};
        const company= await Company.findByIdAndUpdate(req.params.id, updateData ,{new:true});

        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company Info Updated",
            company,
            success:true
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:"An error Occured",
            success:false
        })
    }
}