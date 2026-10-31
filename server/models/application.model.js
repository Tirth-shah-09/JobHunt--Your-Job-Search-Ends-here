//Ye Schema Jo job ke liye apply kar raha hai auske liye
import mongoose from 'mongoose';

const applicationSchema=mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['applied','pending','rejected','approved'],
        default:'pending'
    }
},{timestamps:true});

export const Application=mongoose.model('Application',applicationSchema);