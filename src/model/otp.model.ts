import mongoose, { Schema } from "mongoose";

export interface IOtpSchema  extends mongoose.Document{
    UserId : mongoose.Types.ObjectId,
    Token : number,
    ExpiresAt : string
}


const OtpSchema = new mongoose.Schema<IOtpSchema> ({
    UserId : {
        type :  Schema.Types.ObjectId,
    },
    Token : {
        type :  Number,
    },
    ExpiresAt : {
        type :  String,
    },
},{ timestamps : true})

const OtpModel = mongoose.model("otp", OtpSchema)

export default OtpModel