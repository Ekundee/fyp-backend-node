import mongoose, { model, Mongoose, Schema } from "mongoose";
import { userRole, userStatus } from "../enum/utility.enum";
import { consultantSpecializationConfig, states } from "../status";

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
    Address : Record<string,any>,
    ConsultantInformation : Record<string,any>,
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
          type : String,
          enum: ["USER", "CONSULTANT"]
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
     Address : {
          type : {
               State :  {
                    type : String,
                    enum : states
               },
               Country : String,
               City : String
          }
     },
     ConsultantInformation : {
          type : {
               Specialization : {
                    type : String,
                    enum : consultantSpecializationConfig.map((specialization) => specialization.value),
                    required : false
               },
               LicenseNumber : {
                    type : Number,
                    required : false
               }
          },
          default : null,
          required : false 
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
     },
},{ timestamps : true})

const UserModel = model("user", UserSchema)

export default UserModel;