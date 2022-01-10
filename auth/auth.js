const jwt=require("jsonwebtoken")
const User=require('../model/user')


const auth=async (req,res,next)=>{
    try{
        const authenticase=req.headers['author'];

        const token=jwt.verify(authenticase)
        const user= await User.findOne({_id:token._id,'token':token})
        if(!user){
            return res.status(400).json({
                sucess:false,
                message:"that bai"
            })
        }
        jwt.verify(token,process.env.SECRET_TOKEN)
    }catch (e) {
        console.log('e.........',e)
    }
}
module.exports=auth;
