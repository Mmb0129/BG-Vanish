import {Webhook} from 'svix'
import userModel from '../models/userModel.js'

// API Controller fn to manage clerk user with mongodb database
//http://localhost:4000/api/user/webhooks        API Endpoint

const clerkWebhooks = async (req, res) => {
    try{ 

        //create a Svix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers['svix-id'],
            "svix-timestamp":req.headers['svix-timestamp'],
            "svix-signature":req.headers['svix-signature']
        })

        console.log("Webhook Payload:", req.body);

        console.log(req.headers);
        const {data, type} = req.body
        console.log(type)

        switch (type) {
            case "user.created":{
                
                const userData ={
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    photo: data.image_url
                }

                await userModel.create(userData).catch((err) => {
                    console.error("Error creating user:", err);
                });
                res.json({})

                break;
            }
            
            case "user.updated":{
                const userData ={
                    
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_Name,
                    lastName: data.last_Name,
                    photo: data.image_url
                }

                await userModel.findOneAndUpdate({clerkId:data.id},userData)
                res.json({})
                break;
            }

            case "user.deleted":{
                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})

                break;
            }

        
            default:
                break;
        }

    }
    catch (error){
        console.log("Webhook Verification Failed",error.message)
        res.json({success:false, message:error.message})
    }

}


//API Controller to get user available credits data

const userCredits = async (req,res)=>{
    console.log("Inside userCredits")
    try{
        const {clerkId} =req.body
        const userData = await userModel.findOne({clerkId})

        res.json({success:true, credits: userData.creditBalance})
    }
    catch (error){
        console.log("Webhook Verification Failed",error.message)
        res.json({success:false, message:error.message})
    }
}

export {clerkWebhooks, userCredits}


