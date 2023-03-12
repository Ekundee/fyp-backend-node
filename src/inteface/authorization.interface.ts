import mongoose from "mongoose";
import { userRole } from "../enum/utility.enum";

export interface signInDto {
    Email : string,
    Password : string
}

export interface signUpDto {
    Firstname : string,
    Lastname : string,
    Email : string,
    Role : string,
    Password : string
}

export interface changePasswordDto{
    Id : mongoose.Types.ObjectId,
    OldPassword : string,
    NewPassword : string,
}

export interface changeEmailDto{
    Id : mongoose.Types.ObjectId,
    NewEmail : string,
}


export interface changePhoneNumberDto{
    Id : mongoose.Types.ObjectId,
    NewPhoneNo : string,
}

export interface getRefreshTokenDto { 
    Id : mongoose.Types.ObjectId,
    Role : userRole
}

export interface validateEmailDto { 
    Id : mongoose.Types.ObjectId,
    OTP : string
}