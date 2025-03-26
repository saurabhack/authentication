import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    verifyOTP:{
        type:String,
        default:'',
    },
    verifyOTPEpireAt:{
        type:Number,
        default:0,
    },
    isVerifyOTPEpireAt:{
        type:Boolean,
        default:false,
    },
    resetOTP:{
        type:String,
        default:''
    }
})
const userModel=mongoose.model('user',userSchema)
export default userModel