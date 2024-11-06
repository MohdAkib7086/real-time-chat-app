
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config({path:"./.env"})


module.exports.authMiddleware=async(req,res,next)=>{
   const {authToken}=req.cookies;
   if(authToken){
       const decodeToken=await jwt.verify(authToken,process.env.SECRET);
       req.myId=decodeToken.id;
       next()
   }else{
       res.status(400).json({
        error:{
            errorMessage:['Please login first']
        }
       })
   }
}