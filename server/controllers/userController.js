import { generateToken } from "../lib/utils.js";
import UserChat from "../models/User.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"
// register controller
export const signUp=async(req,res)=>{
    const {fullName,email,password,bio}=req.body;
    try {
        console.log("just came",fullName,email,password,bio)
        if(!fullName || !email || !password || !bio){
            return res.json({success:false,message:"missing details"})
        }

        const user=await UserChat.findOne({email})
        if(user){
            return res.json({success:false,message:"account already exists"})
        }
        console.log("all came")
        const salt=await bcrypt.genSalt(10)
        const hashed=await bcrypt.hash(password,salt)
        const newUser=await UserChat.create({
            fullName,email,password:hashed,bio
        })
        const token=generateToken(newUser._id)
        res.json({success:true,userData:newUser,token,message:"account created successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message+" error from signup controller")
    }
}

// login controller

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const userData=await UserChat.findOne({email})
        const ispasswordCorrect=await bcrypt.compare(password,userData.password)
        if(!ispasswordCorrect){
            return res.json({success:false,message:"invalid credentials"})
        }
         const token=generateToken(userData._id)
        res.json({success:true,userData,token,message:"login successful"})
    } catch (error) {
         res.json({success:false,message:error,message})
        console.log(error.message)
    }
}

// controller to check user is authenticated

export const checkAuth=(req,res)=>{
    res.json({success:true,user:req.user})
}

// update userprofile controller
export const updateProfile=async(req,res)=>{
    try {
        const {profilePic,bio,fullName}=req.body;
        const userId=req.user._id
        let updatedUser;
        if(!profilePic){
            updatedUser=await UserChat.findById(userId,{bio,fullName},{new:true});
            
        }
        else{
            const upload=await cloudinary.uploader.upload(profilePic)
            updatedUser=await UserChat.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true});

        }
        res.json({success:true,user:updatedUser});
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message)
    }
}