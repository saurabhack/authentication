import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model"
export async function register(req,res){
    const {name,email,password}=req.body
    if(!name || !email || !password ){
        return res.json({success:false,message:"Missing Details"})
    }
    try {
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"user is already exists !!"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new userModel({name,email,password:hashedPassword})
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'});
        res.cookie('token',token, {
            httpOnly:true,
            secure:process.env.NODE_ENV==='production', 
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7*24*60*60*1000
        })
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
export async function login(req,res){
    const {email,password}=req.body
    if(!email || !password){
        return res.json({success:false,message:"email and password are required"})
    }
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"invalid email"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false , message:"Invalid password"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'});
        res.cookie('token',token, {
            httpOnly:true,
            secure:process.env.NODE_ENV==='production', 
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true});
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export async function logOut(req,res){

}