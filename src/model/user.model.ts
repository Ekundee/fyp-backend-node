import mongoose, { model, Mongoose, Schema } from "mongoose";
import { userRole, userStatus } from "../enum/utility.enum";

export interface IUserSchema  extends mongoose.Document{
    Firstname : string,
    Lastname : string,
    Email : string,
    Role : userRole,
    Phonenumber : string,
    Username : string,
    Password : string,
    Balance : number,
    SystemId : string,
    Otp : mongoose.Types.ObjectId,
    IsEmailVerified : boolean,
    IsPhoneNoVerified : boolean,
    Status : userStatus,
}

const UserSchema = new Schema<IUserSchema>({
    Firstname : {
        type : String
    },
    Lastname : {
        type : String
    },
    Email : {
        type : String
    },
    Role : {
        type : String
    },
    Phonenumber : {
        type : String
    },
    Username : {
        type : String
    },
    Password : {
        type : String
    },
    Balance : {
        type : Number
    },
    SystemId : {
        type : String
    },
    Otp : {
        type : Schema.Types.ObjectId,
        ref : "otps"
    },
    IsEmailVerified : {
        type : Boolean
    },
    IsPhoneNoVerified : {
        type : Boolean
    },
    Status : {
        type : String,
        enum : userStatus
    }
},{ timestamps : true})

const UserModel = model("user", UserSchema)

export default UserModel;