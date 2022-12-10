import mongoose, { model, Schema } from "mongoose";

export interface IUserSchema {
    Firstname : string,
    Lastname : string,
    Email : string,
    Role : string,
    Phonenumber : string,
    Username : string,
    Password : string,
    Balance : number,
    Otp : Schema.Types.ObjectId,
    IsEmailVerified : boolean,
    IsPhoneNoVerified : boolean,
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
    Otp : {
        type : mongoose.Types.ObjectId,
        ref : "otp"
    },
    IsEmailVerified : {
        type : Boolean
    },
    IsPhoneNoVerified : {
        type : Boolean
    },
})

const UserModel = model("user", UserSchema)

export default UserModel;