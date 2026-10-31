import jwt from 'jsonwebtoken';

const isAuthenticated= async(req,res,next)=>{
    // console.log(req.cookies);
    console.log('i am here');
    console.log(req.path);
    console.log(next);
        try{
        const token=req.cookies.token ;
        
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        // console.log(process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id=decode.userId;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:"An error occurred",
            success:false
        })
    }
}

export default isAuthenticated;