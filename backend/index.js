import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDB from "./mongodb.js"
import authRouter from "./routes/authRoute.js"
const app=express()
const port=process.env.PORT || 3000
connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true}))
app.use('/api/auth',authRouter)
app.listen(port,()=>{
    console.log(`server is listening on the port of http://localhost:${port}`)
})