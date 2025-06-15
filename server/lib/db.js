import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log("DB connected")
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-App`)

    } catch (error) {
        console.log(error)
    }
}

