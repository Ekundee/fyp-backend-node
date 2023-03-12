import mongoose from "mongoose";
import { userRole } from "../enum/utility.enum";

export interface getProfile {
    Firstname : string,
    Lastname : string,
    Email : string,
    Role : userRole,
    Phonenumber : string,
    Username : string,
    Balance : number,
    IsEmailVerified : boolean,
    IsPhoneNoVerified : boolean,
}
export interface updateProfileDto {
    Id : mongoose.Types.ObjectId,
    Firstname : string,
    Lastname : string,
    Username : string,
}

export interface getProfileResponse {
    Firstname : string,
    Lastname :string,
    Email : string,
    Role : string,
    Phonenumber : string,
    Username : string,
    Balance : number,
    IsEmailVerified : boolean,
    IsPhoneNoVerified : boolean,
}
