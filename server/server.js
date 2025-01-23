import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

//App config
const PORT=process.env.PORT || 4000
const app=express()
await connectDB()

//Initialize Middlewares
app.use(express.json()) //Any request will be now parsed using json method
app.use(cors())         //to connect client running on different port to the backend server

//API Routes
//'/' is the api endpoint


app.get('/',(req,res)=> res.send("API Working"))
app.use('/api/user', userRouter)

app.use('/api/image',imageRouter)

app.listen(PORT, ()=>console.log("Server running on port "+PORT))