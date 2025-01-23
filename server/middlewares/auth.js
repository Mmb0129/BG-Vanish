import jwt from 'jsonwebtoken'

//Middleware function to decode jwt token to get clerkId
const authUser= async (req,res,next)=>{
    console.log("Authenticating User")
    try{
        const {token} = req.headers
        if (!token){
            return res.json({success:false, message:'Not Authorized Login Again'})
        }

        const token_decode = jwt.decode(token)
        req.body.clerkId=token_decode.clerkId
        next()  //very important to call next() to move to the next middlewares (i.e) userCredits())

    }
    catch (error){
        console.log("Webhook Verification Failed",error.message)
        res.json({success:false, message:error.message})
    }
}

export default authUser