import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    profilePic:{
        type:String,
        default:"",
    },
    bio:{
        type:String
    }
},{timestamps:true})

const UserChat=mongoose.model("UserChat",UserSchema);

export default UserChat