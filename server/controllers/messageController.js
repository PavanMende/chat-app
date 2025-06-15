// get all users except logged in user
import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import UserChat from "../models/User.js";
import { io } from "../server.js";
import { userSocketMap } from "../server.js";
export const getUsersForSideBar=async(req,res)=>{
    try {
        const {userId}=req.user._id
        const users=await UserChat.find({_id:{$ne:userId}}).select("-password")
        // count no of unseen msgs
        const unseenMessages={}
        const promises=users.map(async(user)=>{
                const messages=await Message.find({senderId:user._id,receiverId:userId,seen:false})
                if(messages.length>0){
                    unseenMessages[user._id]=messages.length
                }
        })
        await Promise.all(promises)
        res.json({success:true,users:users,unseenMessages})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
// get all msgs for selected user

export const getMessaages= async(req,res)=>{
    try {
        const {id:selectedUserId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:selectedUserId},
                {senderId:selectedUserId,receiverId:myId},
                
            ]
        })
      await Message.updateMany({senderId:selectedUserId,receiverId:myId},{seen:true})
        res.json({success:true,messages})
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// api to mark messages  as seen using messageid
export const markMessageAsSeen=async(req,res)=>{
    try {
        const {id}=req.params;
            await Message.findByIdAndUpdate(id,{seen:true});
            res.json({success:true});
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}

// send msg to selected user

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body
        const receiverId=req.params.id;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageUrl=uploadResponse.secure_url
        }
        const newMessage=await Message.create(
            senderId,receiverId,text,imageUrl
        )
        // emit the new message to receiver's socket
        const receiverSocketId=userSocketMap[receiverId]
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        return res.json({success:true,newMessage});
    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}